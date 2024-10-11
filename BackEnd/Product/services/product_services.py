from django.core.exceptions import ValidationError
from django.utils import timezone
from rest_framework import serializers
from Auction.services.auction_service import AuctionService
from Bids.services.bid_service import BidService
from Product.models import Category, Product


class ProductService:

    @staticmethod
    def check_product_buyable(product):
        if not product or not hasattr(product, 'id') or product.buy_now_prize is None:
            raise serializers.ValidationError(
                {'detail': 'Invalid product or missing attributes.'})

        # Retrieve the auction for the given product
        auction = AuctionService.get_auction_by_product(product_id=product.id)
        if auction is None or auction.winner:
            raise serializers.ValidationError(
                {'detail': 'Auction not found for this product.'})

        # Retrieve the highest bid for the auction
        highest_bid = BidService.get_highest_bid(auction=auction)
        if highest_bid is None:
            # No bids have been placed, so the product is buyable
            return

        # Check if the highest bid exceeds the buy now price
        if highest_bid.amount > product.buy_now_prize:
            raise serializers.ValidationError(
                {'detail': 'This product is not buyable, bid exceeded the buy now price.'}
            )

    @staticmethod
    def validate_product_data_updation(data, auction):

        highest_bid = BidService.get_highest_bid(auction=auction)
        # Category validation
        category_name = data.get('category')
        if category_name and not Category.objects.filter(name=category_name).exists():
            raise ValidationError("Category does not exist.")

        # Buy Now Price and Initial Prize validation
        buy_now_price = float(data.get('buyNowPrice', 0))
        initial_prize = float(data.get('initialPrize', 0))

        if highest_bid and buy_now_price and buy_now_price != auction.product.buy_now_prize:
            raise ValidationError(
                "This auction is being bidded. Buy now price cannot be changed")

        if buy_now_price <= 0:
            raise ValidationError("Buy Now Price must be a positive number.")

        if initial_prize < 0:
            raise ValidationError(
                "Initial prize must be a positive number or zero.")
        if initial_prize > buy_now_price:
            raise ValidationError(
                "Initial prize must be less than Buy Now Price.")

        # End Date validation
        end_time = data.get('endDate')
        if end_time:
            try:
                end_time_obj = timezone.datetime.fromisoformat(end_time)
                if end_time_obj != auction.end_time and end_time_obj <= timezone.now():
                    raise ValidationError("End Date must be in the future.")
            except ValueError:
                raise ValidationError("Invalid End Date format.")

        # Status validation
        status = data.get('status')
        if status not in ['active', 'inactive']:
            raise ValidationError("Status must be 'active' or 'inactive'.")

        # Validate when status is set to 'active'
        if status == 'active':
            if highest_bid and auction.end_time != timezone.datetime.fromisoformat(end_time):
                raise ValidationError(
                    "This auction is being bidded, cannot alter the ending time now.")
            if not end_time or timezone.datetime.fromisoformat(end_time) <= timezone.now():
                raise ValidationError(
                    "Auction cannot be set to active when the End Date is in the past.")
            if auction.winner:
                raise ValidationError(
                    f"Cannot activate, this auction is already won by {auction.winner}.")

        # Validate when status is set to 'inactive'
        if status == 'inactive' and highest_bid:
            raise ValidationError(
                "This auction is being bidded by users, cannot deactivate it now.")

    @staticmethod
    def get_users_active_products(user):
        return Product.objects.filter(
            owner=user, is_deleted=False, auction__winner__isnull=True).order_by('-created_at')
