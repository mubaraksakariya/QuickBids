from rest_framework import serializers
from .models import Payment, WithdrawalRequest


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'user', 'product', 'amount',
                  'transaction_type', 'transaction_id', 'created_at']


class WithdrawalRequestSerializer(serializers.ModelSerializer):
    account_number = serializers.SerializerMethodField()
    ifsc_code = serializers.SerializerMethodField()
    bank_name = serializers.SerializerMethodField()

    class Meta:
        model = WithdrawalRequest
        fields = [
            'id', 'user', 'account_detail', 'account_number', 'ifsc_code',
            'bank_name', 'amount', 'status', 'processed_at',
            'failure_reason', 'requested_at'
        ]
        read_only_fields = ['user', 'status',
                            'requested_at', 'processed_at', 'failure_reason']

    def get_account_number(self, obj):
        """Retrieve and decrypt the account number from the AccountDetail model."""
        if obj.account_detail:
            # Assuming you have the method to decrypt
            return obj.account_detail.get_account_number()
        return None

    def get_ifsc_code(self, obj):
        """Retrieve and decrypt the IFSC code from the AccountDetail model."""
        if obj.account_detail:
            # Assuming you have the method to decrypt
            return obj.account_detail.get_ifsc_code()
        return None

    def get_bank_name(self, obj):
        """Retrieve the bank name from the AccountDetail model."""
        if obj.account_detail:
            return obj.account_detail.bank_name
        return None
