from rest_framework import serializers

from Customer.serializers import UserSerializer
from .models import AccountDetail, CardDetail, Payment, UPIDetail, WithdrawalRequest


class AccountDetailSerializer(serializers.ModelSerializer):
    account_number = serializers.SerializerMethodField()
    ifsc_code = serializers.SerializerMethodField()

    class Meta:
        model = AccountDetail
        fields = ['account_number', 'ifsc_code', 'bank_name']

    def get_account_number(self, obj):
        return obj.get_account_number()

    def get_ifsc_code(self, obj):
        return obj.get_ifsc_code()


class CardDetailSerializer(serializers.ModelSerializer):
    card_number = serializers.SerializerMethodField()
    cvv = serializers.SerializerMethodField()

    class Meta:
        model = CardDetail
        fields = ['card_number', 'cvv', 'valid_through',
                  'name_on_card', 'last_four_digits']

    def get_card_number(self, obj):
        return obj.get_card_number()

    def get_cvv(self, obj):
        return obj.get_cvv()


class UPIDetailSerializer(serializers.ModelSerializer):
    upi_id = serializers.SerializerMethodField()

    class Meta:
        model = UPIDetail
        fields = ['upi_id']

    def get_upi_id(self, obj):
        return obj.get_upi_id()


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'user', 'product', 'amount',
                  'transaction_type', 'transaction_id', 'created_at']


class WithdrawalRequestSerializer(serializers.ModelSerializer):
    account_details = AccountDetailSerializer(
        source='account_detail', read_only=True)
    card_details = CardDetailSerializer(source='card_detail', read_only=True)
    upi_details = UPIDetailSerializer(source='upi_detail', read_only=True)
    user = UserSerializer()

    class Meta:
        model = WithdrawalRequest
        fields = [
            'id', 'user', 'type', 'account_details', 'card_details', 'upi_details',
            'amount', 'status', 'processed_at', 'failure_reason', 'requested_at'
        ]
        read_only_fields = ['user', 'status',
                            'requested_at', 'processed_at', 'failure_reason']
