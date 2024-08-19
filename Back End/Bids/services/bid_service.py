from rest_framework import serializers
from decimal import Decimal
from Bids.models import Bid
from django.db import IntegrityError


class BidService:

    @staticmethod
    def get_highest_bid(auction, user=None):
        """
        Fetch the highest bid for a given auction.
        """
        if user:
            return Bid.objects.filter(
                auction=auction, user=user).order_by('-amount').first()
        return Bid.objects.filter(auction=auction).order_by('-amount').first()

    # checks if the new bid amount is greater than the existing highest bid amount
    @staticmethod
    def validate_bid_amount(amount, auction):
        highest_bid = Bid.objects.filter(
            auction=auction).order_by('-amount').first()

        if highest_bid and amount <= highest_bid.amount:
            raise serializers.ValidationError(
                {'detail': 'Your bid must be higher than the current highest bid.'})

        if amount < auction.initial_prize:
            raise serializers.ValidationError(
                {'detail': 'Your bid must be higher or equal to the initial prize.'})
        return highest_bid

    @staticmethod
    def create_bid(auction, user, amount):
        try:
            # Create the bid instance
            bid = Bid.objects.create(auction=auction, user=user, amount=amount)
            return bid
        except IntegrityError as e:
            # Catch database integrity errors (e.g., foreign key constraints)
            raise serializers.ValidationError(
                {'detail': 'Database integrity error: ' + str(e)})
        except ValueError as e:
            # Catch issues related to data validation
            raise serializers.ValidationError(
                {'detail': 'Invalid data provided: ' + str(e)})
        except Exception as e:
            # Catch any other unexpected errors
            raise serializers.ValidationError(
                {'detail': 'Failed to create bid: ' + str(e)})
