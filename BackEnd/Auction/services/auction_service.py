from django.utils import timezone
from datetime import datetime
from rest_framework import serializers
from Auction.models import Auction
from django.core.exceptions import ValidationError
from django.utils.dateparse import parse_datetime
import logging

logger = logging.getLogger(__name__)


class Utilities:
    @staticmethod
    def parse_and_validate_date(date_input):
        """
        Parse and validate the given date input. If it's already a valid datetime object, return it.
        If it's a string, attempt to parse it.

        Args:
            date_input (str or datetime): The date input to validate and parse.

        Returns:
            datetime or None: The validated or parsed datetime object if valid, otherwise None.

        Raises:
            ValidationError: If the date string is invalid.
        """
        # If the input is already a datetime object, return it directly
        if isinstance(date_input, datetime):
            return date_input

        # If the input is a string, attempt to parse it
        if isinstance(date_input, str):
            parsed_date = parse_datetime(date_input)
            if parsed_date is None:
                raise ValidationError(f"Invalid date format: {date_input}")
            return parsed_date

        # If the input is neither a datetime object nor a valid string, return None
        return None


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
        count = 0
        for auction in auctions:
            if auction.winning_bid:
                # Use the amount of the winning bid
                total_sales += auction.winning_bid.amount
            else:
                # Use the buy now price of the product
                total_sales += auction.product.buy_now_prize
            count += 1
        return {'amount': total_sales, 'count': count}

    @staticmethod
    def total_auctions():
        total_auctions = Auction.objects.all()
        amount = 0
        count = 0
        for auction in total_auctions:
            if auction.winning_bid:
                # Use the amount of the winning bid
                amount += auction.winning_bid.amount
            else:
                # Use the buy now price of the product
                amount += auction.product.buy_now_prize
            count += 1
        return {'amount': amount, 'count': count}

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
    def sold_auctions(from_date=None, to_date=None):
        """
        Retrieves a queryset of sold auctions (where winner is not null).
        Optionally filters auctions by end time within the given date range.

        Args:
            from_date (datetime, optional): The start date for filtering auctions.
            to_date (datetime, optional): The end date for filtering auctions.

        Returns:
            QuerySet: A queryset of sold auctions filtered by the provided date range.
        """
        try:
            # Parse and validate the dates (if provided)
            from_date = Utilities.parse_and_validate_date(from_date)
            to_date = Utilities.parse_and_validate_date(to_date)

            # Base queryset for sold auctions
            sold_auctions = Auction.objects.filter(
                winner__isnull=False, is_deleted=False
            )

            # Apply date filters if provided
            if from_date and to_date:
                sold_auctions = sold_auctions.filter(
                    end_time__range=[from_date, to_date]
                )
            elif from_date:
                sold_auctions = sold_auctions.filter(end_time__gte=from_date)
            elif to_date:
                sold_auctions = sold_auctions.filter(end_time__lte=to_date)

            return sold_auctions

        except ValidationError as ve:
            logger.error(f"Date validation error: {ve}")
            raise ValidationError(f"Date validation error: {ve}")

        except Exception as e:
            logger.error(f"Error retrieving sold auctions: {e}")
            raise Exception(
                "An unexpected error occurred while retrieving sold auctions.")

    @staticmethod
    def not_sold_auctions(from_date=None, to_date=None):
        not_sold_auctions = Auction.objects.filter(
            winner__isnull=True, is_deleted=False, is_active=False)
        if from_date and to_date:
            not_sold_auctions = not_sold_auctions.filter(
                end_time__range=[from_date, to_date]
            )
        elif from_date:
            not_sold_auctions = not_sold_auctions.filter(
                end_time__gte=from_date)
        elif to_date:
            not_sold_auctions = not_sold_auctions.filter(end_time__lte=to_date)
        return not_sold_auctions
