from django.core.exceptions import ValidationError
from django.utils import timezone
from rest_framework import serializers
from Auction.services.auction_service import AuctionService
from Bids.services.bid_service import BidService
from Product.models import Category


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
        errors = None

        # Title validation
        if not data.get('title'):
            errors = "Title is required."

        # Category validation
        if not data.get('category'):
            errors = "Category is required."
        elif not Category.objects.filter(name=data['category']).exists():
            errors = "Category does not exist."

        # Buy Now Price validation
        buy_now_price = data.get('buyNowPrice')
        if not buy_now_price or float(buy_now_price) <= 0:
            errors = "Buy Now Price must be a positive number."

        # Initial Prize validation
        initial_prize = data.get('initialPrize')
        if not initial_prize or float(initial_prize) <= 0:
            errors = "Initial Prize must be a positive number."

        # End Date validation
        end_time = data.get('endDate')
        if end_time:
            end_time_obj = timezone.datetime.fromisoformat(end_time)
            try:
                if end_time_obj != auction.end_time and end_time_obj <= timezone.now():
                    errors = " End Date must be in the future."
            except ValueError:
                errors = "Invalid End Date format."

         # Status validation
        status = data.get('status')
        if status not in ['active', 'inactive']:
            errors = "Status must be 'active' or 'inactive'."

        # Additional check: if status is being changed to 'active', validate the end time
        if status == 'active':
            # If there's no end time or the end time is in the past, the auction cannot be activated
            if not end_time or timezone.datetime.fromisoformat(end_time) <= timezone.now():
                errors = "Auction cannot be set to active when the End Date is in the past."
            if auction.winner:
                errors = f'Cannot activate, This acution is already wone by {auction.winner}'
        if errors:
            raise ValidationError(errors)
