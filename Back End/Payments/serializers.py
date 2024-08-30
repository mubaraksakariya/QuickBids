from rest_framework import serializers
from .models import Payment, WithdrawalRequest


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'user', 'product', 'amount',
                  'transaction_type', 'transaction_id', 'created_at']


class WithdrawalRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = WithdrawalRequest
        fields = ['id', 'user', 'account_number',
                  'ifsc_code', 'amount', 'status', 'processed_at', 'failure_reason', 'requested_at']
        read_only_fields = ['user', 'status',
                            'requested_at', 'processed_at', 'failure_reason']
