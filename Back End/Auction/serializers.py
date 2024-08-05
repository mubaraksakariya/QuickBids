from rest_framework import serializers
from Product.models import Product
from .models import Auction

class AuctionSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())

    class Meta:
        model = Auction
        fields = [
            'id',
            'product', 
            'initial_prize',
            'start_time',
            'end_time',
            'is_active',
            'is_deleted',
            'created_at',
            'updated_at',
            'winner',
            'winning_bid',
        ]
