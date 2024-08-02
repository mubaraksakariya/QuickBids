import razorpay
import hmac
import hashlib


from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response

from django.conf import settings

from Payments.models import Payment
from Payments.serializers import PaymentSerializer

# Initialize Razorpay client
client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

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
        receipt = request.data.get('receipt', f'{request.user.id}_wallet_order')

        order_data = {
            'amount': int(amount) * 100,  # Amount in paise
            'currency': currency,
            'receipt': receipt
        }

        try:
            order = client.order.create(data=order_data)
            return Response(order, status=status.HTTP_201_CREATED)
        except razorpay.errors.RazorpayError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated], url_path='payment-success')
    def payment_success(self, request):
        try:
            razorpay_payment_id = request.data.get('razorpay_payment_id')
            razorpay_order_id = request.data.get('razorpay_order_id')
            razorpay_signature = request.data.get('razorpay_signature')

            generated_signature = hmac.new(
                key=bytes(settings.RAZORPAY_KEY_SECRET, 'utf-8'),
                msg=bytes(f"{razorpay_order_id}|{razorpay_payment_id}", 'utf-8'),
                digestmod=hashlib.sha256
            ).hexdigest()

            payment_details = client.payment.fetch(razorpay_payment_id)

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