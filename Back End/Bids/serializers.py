from rest_framework import serializers

from Customer.serializers import UserSerializer
from .models import Bid, ProxyBid


class BidSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Bid
        fields = ['id', 'auction', 'user', 'amount', 'created_at']

    # def validate_amount(self, value):
    #     if value <= 0:
    #         raise serializers.ValidationError(
    #             "Bid amount must be greater than zero.")
    #     return value


class ProxyBidSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = ProxyBid
        fields = ['id', 'auction', 'user', 'bid_step',
                  'max_bid', 'created_at', 'updated_at', 'is_active']

    def validate(self, data):
        """
        Validate the proxy bid data.
        Ensure that bid_step is positive and max_bid is greater than or equal to initial prize.
        """
        if data['bid_step'] <= 0:
            raise serializers.ValidationError(
                "Bid step must be greater than zero.")
        if data['max_bid'] <= 0:
            raise serializers.ValidationError(
                "Max bid must be greater than zero.")
        return data
