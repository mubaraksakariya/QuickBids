from rest_framework import serializers
from .models import Bid, ProxyBid

class BidSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bid
        fields = ['id', 'auction', 'user', 'amount', 'created_at', 'is_deleted']

class ProxyBidSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProxyBid
        fields = ['id', 'auction', 'user', 'bid_step', 'max_bid', 'current_bid', 'created_at', 'updated_at', 'is_deleted']
