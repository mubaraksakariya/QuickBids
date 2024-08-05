from celery import shared_task
from django.utils import timezone
import pytz
from Auction.models import Auction
from Bids.models import Bid
from Wallet.models import Transaction, Wallet

@shared_task
def check_ended_auctions():
    now = timezone.now()
    ended_auctions = Auction.objects.filter(end_time__lt=now, is_deleted=False, is_active = True)

    for auction in ended_auctions:
        auction.is_active = False
        auction.save()
        # print(f"Auction ended for product: {auction.product.title}")

        # Get the winning bid
        winning_bid = Bid.objects.filter(auction=auction, is_deleted=False).order_by('-amount').first()
        if winning_bid:
            auction.winning_bid = winning_bid
            auction.winner = winning_bid.user
            auction.save()

            # Get the owner of the product
            product_owner = auction.product.owner

            # Retrieve or create the wallet for the product owner
            wallet, created = Wallet.objects.get_or_create(user=product_owner)
            # Add the winning bid amount to the owner's wallet
            wallet.balance += winning_bid.amount
            wallet.save()

            Transaction.objects.create(
                wallet=wallet,
                amount=winning_bid.amount,
                transaction_type='AUCTION_SALE',
                transaction_id=auction.id,
                description=f'Winning bid amount for auction {auction.id}'
            )
            
        else:
            auction.save()
             