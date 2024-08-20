from rest_framework import serializers
from Auction.models import Auction


class AuctionService:
    @staticmethod
    def get_auction(auction_id):
        try:
            return Auction.objects.get(id=auction_id)
        except Auction.DoesNotExist:
            raise serializers.ValidationError({'detail': 'Auction not found.'})

    @staticmethod
    def get_auction_by_product(product_id):
        try:
            return Auction.objects.get(product__id=product_id, is_deleted=False)
        except Auction.DoesNotExist:
            raise serializers.ValidationError(
                {'detail': 'Auction not found for this product.'})

    @staticmethod
    def mark_as_bought(product_id, winner):
        try:
            auction = Auction.objects.get(
                product__id=product_id, is_deleted=False)
            auction.is_active = False
            auction.winner = winner
            auction.save()
            return auction
        except Auction.DoesNotExist:
            raise serializers.ValidationError(
                {'detail': 'Auction not found for this product.'})
