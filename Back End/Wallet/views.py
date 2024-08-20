from decimal import Decimal
import razorpay
import hmac
import hashlib

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404

from Payments.models import Payment
from .models import Wallet, Transaction
from .serializers import WalletSerializer, TransactionSerializer

from django.conf import settings

# Initialize Razorpay client
client = razorpay.Client(
    auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))


class WalletViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = WalletSerializer

    def get_queryset(self):
        return Wallet.objects.filter(user=self.request.user)

    def list(self, request, *args, **kwargs):
        wallet, created = Wallet.objects.get_or_create(user=self.request.user)
        serializer = self.get_serializer(wallet)
        return Response(serializer.data)

    # success funtion for topup of wallet

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
            amount = Decimal(payment_details['amount'])/100

            if generated_signature == razorpay_signature:
                # Payment is successful and verified
                Payment.objects.create(
                    user=request.user,
                    amount=amount,
                    transaction_type='RAZORPAY',
                    transaction_id=razorpay_payment_id,
                )

                wallet = Wallet.objects.get(user=request.user)
                wallet.balance += amount
                wallet.save()
                transaction = Transaction.objects.create(
                    wallet=wallet,
                    amount=amount,
                    transaction_type='DEPOSIT',
                    transaction_id=razorpay_payment_id,
                    description=f'{wallet.user} deposited {amount} into their wallet'
                )
                return Response({'status': 'success', 'balance': wallet.balance}, status=status.HTTP_200_OK)
            else:
                return Response({'status': 'failed', 'message': 'Invalid signature'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            print(str(e))
            return Response({'status': 'error', 'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class TransactionViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = TransactionSerializer

    def get_queryset(self):
        return Transaction.objects.filter(wallet__user=self.request.user).order_by('-timestamp')

    def list(self, request, *args, **kwargs):
        wallet_transactions = self.get_queryset()
        serializer = self.get_serializer(wallet_transactions, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        wallet = get_object_or_404(Wallet, user=request.user)
        data = request.data.copy()
        data['wallet'] = wallet.id  # type: ignore
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        transaction = serializer.instance
        if transaction.transaction_type == 'DEPOSIT':
            wallet.balance += transaction.amount
        elif transaction.transaction_type == 'WITHDRAWAL':
            if wallet.balance < transaction.amount:
                return Response({"error": "Insufficient funds"}, status=status.HTTP_400_BAD_REQUEST)
            wallet.balance -= transaction.amount
        wallet.save()

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
