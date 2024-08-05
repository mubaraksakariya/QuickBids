from celery import shared_task
from django.utils import timezone
import pytz
from Auction.models import Auction
from Bids.models import Bid

@shared_task
def check_ended_auctions():
    now = timezone.now()
    ended_auctions = Auction.objects.filter(end_time__lt=now, is_deleted=False, is_active = True)
    for auction in ended_auctions:
        auction.is_active = False
        auction.save()
        # print(f"Auction ended for product: {auction.product.title}")

        winning_bid = Bid.objects.filter(auction=auction, is_deleted=False).order_by('-amount').first()
        if winning_bid:
            auction.winning_bid = winning_bid
            auction.winner = winning_bid.user
            auction.save()
        else:
            auction.save()
            