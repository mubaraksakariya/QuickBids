from rest_framework import serializers
from decimal import Decimal
from Bids.models import ProxyBid, Bid
from Bids.services.bid_service import BidService
from Wallet.services.wallet_service import WalletService
from rest_framework.exceptions import ValidationError
from django.db import transaction


class ProxyBidService:
    @staticmethod
    def get_highest_proxy_bid(auction, user=None):
        print(user, auction)
        if user:
            return ProxyBid.objects.filter(auction=auction, user=user, is_deleted=False, is_active=True).order_by('-max_bid').first()
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
    def invalidate_proxy_bid(auction, max_bid):
        """
        Deactivate the most recent active proxy bid for the given auction if the new max bid is higher.
        """
        try:
            # Find the most recent active proxy bid for the given auction
            recent_proxy_bid = ProxyBidService.get_highest_proxy_bid(
                auction=auction)
            if recent_proxy_bid:
                # Check if the new max bid is less than or equal to the current max bid
                if recent_proxy_bid.max_bid >= max_bid:
                    raise serializers.ValidationError(
                        {'detail': 'A higher or equal proxy bid already exists for this auction.'}
                    )

                # Deactivate the most recent active proxy bid
                recent_proxy_bid.is_active = False
                recent_proxy_bid.save()

                return recent_proxy_bid

            # No active proxy bid found
            return None

        except serializers.ValidationError as ve:
            # Propagate validation errors
            raise ve

        except Exception as e:
            # Catch and raise any other unexpected errors
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
