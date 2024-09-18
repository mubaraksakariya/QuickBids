from decimal import Decimal
import razorpay
import hmac
import hashlib


from rest_framework import viewsets, status, serializers
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.decorators import action
from rest_framework.response import Response

from django.core.exceptions import ValidationError
from django.conf import settings
from django.db import transaction
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from .filters import WithdrawalRequestFilter
from Payments.models import Payment, WithdrawalRequest
from Payments.serializers import PaymentSerializer, WithdrawalRequestSerializer
from Payments.services.payment_services import PaymentService
from Payments.services.razorpay_service import RazorpayService
from QuickBids.pagination import CustomPaymentPagination, CustomPaymentWithdrawalPagination
from Wallet.services import wallet_service
from Wallet.services.wallet_service import WalletService
# Initialize Razorpay client
client = razorpay.Client(
    auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPaymentPagination

    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated], url_path='create-order')
    def create_order(self, request):
        amount = request.data.get('amount')
        if not amount:
            return Response({'error': 'Amount is required'}, status=status.HTTP_400_BAD_REQUEST)

        currency = request.data.get('currency', 'INR')
        receipt = request.data.get(
            'receipt', f'{request.user.id}_wallet_order')

        order_data = {
            'amount': int(amount) * 100,  # Amount in paise
            'currency': currency,
            'receipt': receipt
        }

        try:
            order = client.order.create(data=order_data)  # type: ignore
            return Response(order, status=status.HTTP_201_CREATED)
        except razorpay.errors.RazorpayError as e:  # type: ignore
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated], url_path='payment-success')
    def payment_success(self, request):
        try:
            razorpay_payment_id = request.data.get('razorpay_payment_id')
            razorpay_order_id = request.data.get('razorpay_order_id')
            razorpay_signature = request.data.get('razorpay_signature')

            generated_signature = hmac.new(
                key=bytes(settings.RAZORPAY_KEY_SECRET, 'utf-8'),
                msg=bytes(
                    f"{razorpay_order_id}|{razorpay_payment_id}", 'utf-8'),
                digestmod=hashlib.sha256
            ).hexdigest()

            payment_details = client.payment.fetch(  # type: ignore
                razorpay_payment_id)

            if generated_signature == razorpay_signature:
                # Payment is successful and verified
                Payment.objects.create(
                    user=request.user,
                    amount=payment_details('amount'),
                    transaction_type='RAZORPAY',
                    transaction_id=razorpay_payment_id,
                )
                return Response({'status': 'success'}, status=status.HTTP_200_OK)
            else:
                return Response({'status': 'failed', 'message': 'Invalid signature'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            print(str(e))
            return Response({'status': 'error', 'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # verify if account number and ifsc exists
    @action(detail=False, methods=['post'], url_path='verify-account')
    def verify_account(self, request):
        account_number = request.data.get('account_number')
        ifsc_code = request.data.get('ifsc_code')

        if not account_number or not ifsc_code:
            return Response(
                {"error": "Account number and IFSC code are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        verification_result = RazorpayService.verify_bank_account(
            account_number, ifsc_code)

        if verification_result:
            return Response(verification_result, status=status.HTTP_200_OK)
        return Response(
            {"error": "Failed to verify bank account details."},
            status=status.HTTP_400_BAD_REQUEST
        )

    @action(detail=False, methods=['post'], url_path='create-withdrawal-card')
    @transaction.atomic
    def create_withdrawal_request_by_card(self, request):
        try:
            user = request.user
            card_number = request.data.get('card_number')
            cvv = request.data.get('cvv')
            valid_through = request.data.get('valid_through')
            name_on_card = request.data.get('name_on_card')
            amount = Decimal(request.data.get('amount'))

            # Get user's wallet
            wallet = WalletService.get_wallet(user=user)

            # Check if the wallet has sufficient balance
            WalletService.has_wallet_balance(wallet=wallet, amount=amount)

            # Create or get the card details
            card = PaymentService.create_card(
                user=user,
                card_number=card_number,
                cvv=cvv,
                valid_through=valid_through,
                name_on_card=name_on_card
            )

            # Create the withdrawal request
            withdrawal_request = PaymentService.create_withdrawal_request_by_card(
                user=user,
                card_id=card.id,  # type: ignore
                amount=amount
            )

            # Process the withdrawal transaction
            WalletService.process_transaction(
                wallet=wallet,
                amount=amount,
                transaction_id=withdrawal_request.id,  # type: ignore
                transaction_type='WITHDRAWAL'
            )

            # Return a success response with the serialized withdrawal request data
            return Response(
                {
                    'status': 'success',
                    'message': 'Withdrawal request created successfully.',
                    'data': WithdrawalRequestSerializer(withdrawal_request).data,
                },
                status=status.HTTP_201_CREATED
            )

        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['post'], url_path='create-withdrawal-account')
    @transaction.atomic
    def create_withdrawal_request_by_account(self, request):
        try:
            user = request.user
            account_number = request.data.get('account_number')
            ifsc_code = request.data.get('ifsc_code')
            amount = Decimal(request.data.get('amount'))
            bank_name = request.data.get('bank_name')

            # Create or get the account details
            account = PaymentService.create_account(
                user=user,
                account_number=account_number,
                ifsc_code=ifsc_code,
                bank_name=bank_name,
            )

            # Get user's wallet
            wallet = WalletService.get_wallet(user=user)

            # Check if the wallet has sufficient balance
            WalletService.has_wallet_balance(wallet=wallet, amount=amount)

            # Create the withdrawal request
            withdrawal_request = PaymentService.create_withdrawal_request_by_account(
                user=user,
                account_id=account.id,
                amount=amount
            )

            # Process the withdrawal transaction
            WalletService.process_transaction(
                wallet=wallet,
                amount=amount,
                transaction_id=withdrawal_request.id,
                transaction_type='WITHDRAWAL'
            )

            # Return a success response with the serialized withdrawal request data
            return Response(
                {
                    'status': 'success',
                    'message': 'Withdrawal request created successfully.',
                    'data': WithdrawalRequestSerializer(withdrawal_request).data,
                },
                status=status.HTTP_201_CREATED
            )

        except serializers.ValidationError as e:
            transaction.rollback()
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            transaction.rollback()
            return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['post'], url_path='create-withdrawal-upi')
    @transaction.atomic
    def create_withdrawal_request_by_upi(self, request):
        try:
            user = request.user
            upi_id = request.data.get('upi_id')
            amount = Decimal(request.data.get('amount'))

            # Create or get the UPI details
            upi = PaymentService.create_upi(user=user, upi_id=upi_id)

            # Get user's wallet
            wallet = WalletService.get_wallet(user=user)

            # Check if the wallet has sufficient balance
            WalletService.has_wallet_balance(wallet=wallet, amount=amount)

            # Create the withdrawal request
            withdrawal_request = PaymentService.create_withdrawal_request_by_upi(
                user=user,
                upi_id=upi.id,  # type: ignore
                amount=amount
            )

            # Process the withdrawal transaction
            WalletService.process_transaction(
                wallet=wallet,
                amount=amount,
                transaction_id=withdrawal_request.id,
                transaction_type='WITHDRAWAL'
            )

            # Return a success response with the serialized withdrawal request data
            return Response(
                {
                    'status': 'success',
                    'message': 'Withdrawal request created successfully.',
                    'data': WithdrawalRequestSerializer(withdrawal_request).data,
                },
                status=status.HTTP_201_CREATED
            )

        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# for admin side


class PaymentWithdrawalViewSet(viewsets.ModelViewSet):
    queryset = WithdrawalRequest.objects.all()
    serializer_class = WithdrawalRequestSerializer
    permission_classes = [IsAdminUser]
    pagination_class = CustomPaymentWithdrawalPagination
    filter_backends = [filters.OrderingFilter,
                       DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['user__email', 'user__first_name']
    ordering_fields = '__all__'
    ordering = ['-requested_at']
    filterset_class = WithdrawalRequestFilter

    # def list(self, request, *args, **kwargs):
    #     self.queryset = self.queryset.filter(status='PENDING')
    #     return super().list(request, *args, **kwargs)

    # Override the update method (for PUT requests)

    def update(self, request, *args, **kwargs):
        try:
            withdrawal_request = self.get_object()

            # Check if the withdrawal request can be updated
            PaymentService.check_withdrawal_updatable(
                withdrawal_request=withdrawal_request)

            # Custom logic to modify the request data or perform extra validation
            status_update = request.data.get('status')
            failure_reason = request.data.get('failure_reason')

            # Ensure that failure_reason is provided if the status is REJECTED or FAILED
            if status_update in ['REJECTED', 'FAILED'] and not failure_reason:
                return Response({'error': 'Failure reason is required for REJECTED or FAILED status'},
                                status=status.HTTP_400_BAD_REQUEST)

            # Update the withdrawal request via PaymentService
            withdrawal_request = PaymentService.update_withdrawal_request(
                withdrawal_request=withdrawal_request,
                status_update=status_update,
                failure_reason=failure_reason
            )

            # Return the updated data in the response
            return Response(self.get_serializer(withdrawal_request).data, status=status.HTTP_201_CREATED)

        except ValidationError as e:
            # Handle the case when the request cannot be updated (e.g., already processed)
            return Response({'error': e}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            # Handle any other unforeseen errors
            return Response({'error': 'An unexpected error occurred', 'details': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
