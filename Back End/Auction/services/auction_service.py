from django.utils import timezone
from rest_framework import serializers
from Auction.models import Auction


class AuctionService:
    @staticmethod
    def check_biddable(auction):
        # Check if the auction has ended based on the end_time
        if auction.end_time and auction.end_time <= timezone.now():  # type: ignore
            raise serializers.ValidationError(
                {'detail': 'This auction has already ended, you cannot place bid.'}
            )
        # Check if the auction has a winner and a winning bid
        if auction.winner and auction.winning_bid:
            raise serializers.ValidationError(
                {'detail': 'This auction is already over, try other items.'}
            )

        # Check if the product has been bought via "buy now"
        if auction.winner:
            raise serializers.ValidationError(
                {'detail': 'This product has been bought, try other items.'}
            )

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
