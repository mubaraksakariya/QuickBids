from decimal import Decimal
import razorpay
import hmac
import hashlib


from rest_framework import viewsets, status, serializers
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response

from django.conf import settings
from django.db import transaction

from Payments.models import Payment
from Payments.serializers import PaymentSerializer, WithdrawalRequestSerializer
from Payments.services.payment_services import PaymentService
from Payments.services.razorpay_service import RazorpayService
from Wallet.services import wallet_service
from Wallet.services.wallet_service import WalletService

# Initialize Razorpay client
client = razorpay.Client(
    auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]  # Default permission

    def get_permissions(self):
        if self.action in []:
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()

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

    @action(detail=False, methods=['post'], url_path='create-withdrawal')
    @transaction.atomic
    def create_withdrawal_request(self, request):
        try:
            user = request.user
            account_number = request.data.get('account_number')
            ifsc_code = request.data.get('ifsc_code')
            amount = Decimal(request.data.get('amount'))

            # Get user's wallet
            wallet = WalletService.get_wallet(user=user)

            # Check if the wallet has sufficient balance
            WalletService.has_wallet_balance(wallet=wallet, amount=amount)

            # Create the withdrawal request
            withdrawal_request = PaymentService.create_withdrawal_request(
                user=user,
                account_number=account_number,
                ifsc_code=ifsc_code,
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
