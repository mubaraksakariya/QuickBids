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
        if auction.is_active == False:
            raise serializers.ValidationError(
                {'detail': 'This auction is not active at the moment'}
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

    @staticmethod
    def total_sales():
        auctions = Auction.objects.filter(
            is_active=False, winner__isnull=False)

        total_sales = 0
        for index, auction in enumerate(auctions):
            if auction.winning_bid:
                # Use the amount of the winning bid
                total_sales += auction.winning_bid.amount
            else:
                # Use the buy now price of the product
                total_sales += auction.product.buy_now_prize
        return {'amount': total_sales, 'count': index}

    @staticmethod
    def total_auctions():
        total_auctions = Auction.objects.all()
        amount = 0
        for index, auction in enumerate(total_auctions):
            if auction.winning_bid:
                # Use the amount of the winning bid
                amount += auction.winning_bid.amount
            else:
                # Use the buy now price of the product
                amount += auction.product.buy_now_prize
        return {'amount': amount, 'count': index}

    @staticmethod
    def total_auction_won_by_user(user):
        """
        Returns the total number of auctions won by a user.
        """
        return Auction.objects.filter(winner=user).count()

    @staticmethod
    def total_auction_participation_by_user(user):
        """
        Returns the total number of unique auctions a user has participated in by placing a bid.
        """
        return Auction.objects.filter(bid__user=user).distinct().count()

    @staticmethod
    def total_buy_now_by_user(user):
        """
        Returns the total number of 'Buy Now' auctions where the user is the winner and no bid was placed.
        """
        return Auction.objects.filter(
            winner=user,
            winning_bid__isnull=True,
        ).count()

    @staticmethod
    def sold_auctions():
        return Auction.objects.filter(winner__isnull=False, is_deleted=False)

    @staticmethod
    def not_sold_auctions():
        return Auction.objects.filter(winner__isnull=True, is_deleted=False, is_active=False)
