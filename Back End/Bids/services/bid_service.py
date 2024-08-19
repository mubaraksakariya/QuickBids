from rest_framework import serializers
from decimal import Decimal
from Bids.models import ProxyBid, Bid
from Wallet.services.wallet_service import WalletService
from rest_framework.exceptions import ValidationError
from django.db import IntegrityError, transaction


class ProxyBidService:
    @staticmethod
    def get_highest_proxy_bid(auction, user=None):
        print(user, auction)
        # if user:
        #     return ProxyBid.objects.filter(auction=auction, user=user, is_deleted=False, is_active=True).order_by('-max_bid').first()
        return ProxyBid.objects.filter(auction=auction, is_deleted=False, is_active=True).order_by('-max_bid').first()

    @staticmethod
    def validate_proxy_bid(auction, max_bid):
        """
        Validate that a proxy bid can be placed for the given auction and max_bid.
        Checks:
        1. A higher or equal proxy bid does not already exist.
        2. The max_bid is greater than the current highest bid.
        """
        # Check if a higher or equal proxy bid exists
        if ProxyBid.objects.filter(auction=auction, max_bid__gte=max_bid, is_active=True).exists():
            raise serializers.ValidationError(
                {'detail': 'A higher or equal proxy bid already exists for this auction.'})

        # Get the current highest bid
        highest_bid = BidService.get_highest_bid(auction)
        if highest_bid and highest_bid.amount >= max_bid:
            raise serializers.ValidationError(

                {'detail': 'The auction has exceeded your proxy bid offer. Please try a higher value.'})

    @staticmethod
    def invalidate_proxy_bid(auction):
        """
        Deactivate the most recent active proxy bid for the given auction.
        """
        try:
            # Find the most recent active proxy bid for the given auction
            recent_proxy_bid = ProxyBid.objects.filter(
                auction=auction, is_active=True).order_by('-created_at').first()

            if recent_proxy_bid:
                # Deactivate the most recent active proxy bid
                recent_proxy_bid.is_active = False
                recent_proxy_bid.save()
                return recent_proxy_bid
            else:
                # No active proxy bid found
                return None

        except Exception as e:
            raise Exception(f'An unexpected error occurred: {str(e)}')

    @staticmethod
    def exists_higher_or_equal_proxy_bid(auction, max_bid: Decimal) -> bool:
        return ProxyBid.objects.filter(auction=auction, max_bid__gte=max_bid).exists()

    @staticmethod
    def create_proxy_bid(user, auction, max_bid: Decimal, bid_step: Decimal) -> ProxyBid:
        return ProxyBid.objects.create(
            user=user,
            auction=auction,
            max_bid=max_bid,
            bid_step=bid_step
        )

    @staticmethod
    @transaction.atomic
    def handle_proxy_bidding(auction):
        try:
            # Get the highest proxy bid for the auction
            highest_proxy_bid = ProxyBidService.get_highest_proxy_bid(auction)

            if not highest_proxy_bid:
                return  # Exit if there's no proxy bid

            # Fetch the current highest bid
            highest_bid = BidService.get_highest_bid(auction=auction)
            current_bid_amount = highest_bid.amount if highest_bid else auction.initial_prize
            new_bid_amount = min(
                current_bid_amount + highest_proxy_bid.bid_step, highest_proxy_bid.max_bid)
            print(type(new_bid_amount), new_bid_amount, type(
                current_bid_amount), current_bid_amount)
            if new_bid_amount > current_bid_amount:
                # Place the new bid automatically
                bid = BidService.create_bid(
                    user=highest_proxy_bid.user,
                    auction=auction,
                    amount=new_bid_amount
                )

                # Charge the new bidder's wallet
                bidder_wallet = WalletService.get_wallet(
                    highest_proxy_bid.user)
                WalletService.process_transaction(
                    wallet=bidder_wallet,
                    amount=new_bid_amount,
                    transaction_type="PAYMENT",
                    transaction_id=bid.id  # type: ignore
                )

                # Refund the previous highest bidder, if any
                if highest_bid:
                    old_bidder_wallet = WalletService.get_wallet(
                        highest_bid.user)
                    WalletService.process_transaction(
                        wallet=old_bidder_wallet,
                        amount=highest_bid.amount,
                        transaction_type='REFUND',
                        transaction_id=highest_bid.id  # type: ignore
                    )

        except ValidationError as e:
            print(str(e))
            # Catch and handle specific validation errors
            transaction.set_rollback(True)
            raise e  # Re-raise the validation error to be handled by the caller or API view
        except Exception as e:
            # Log the unexpected error and roll back the transaction
            transaction.set_rollback(True)
            raise ValidationError(
                {'detail': 'An unexpected error occurred: ' + str(e)})


class BidService:
    @staticmethod
    def is_highest_bid_greater_than_max_bid(auction, max_bid: Decimal):
        highest_bid = Bid.objects.filter(
            auction=auction).order_by('-amount').first()
        return highest_bid and highest_bid.amount >= max_bid

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
