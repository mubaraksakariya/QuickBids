from rest_framework import serializers

from Auction.serializers import AuctionSerializer
from Customer.serializers import UserSerializer
from Payments.serializers import WithdrawalRequestSerializer
from Product.serializers import ProductSerializer
from .models import Notification


class NotificationSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    product = ProductSerializer()
    target_user = UserSerializer()
    auction = AuctionSerializer()
    withdrawal_request = WithdrawalRequestSerializer()

    class Meta:
        model = Notification
        fields = [
            'id',
            'user',
            'message',
            'product',
            'target_user',
            'auction',
            'is_read',
            'created_at',
            'type',
            'withdrawal_request',
        ]
        # read_only_fields = ['id', 'created_at']
