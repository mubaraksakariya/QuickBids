from django.db.models.signals import post_save
from django.dispatch import receiver
from Bids.serializers import BidSerializer
from Bids.services.bid_service import ProxyBidService
from Notifications.models import Notification
from .models import Bid
from Bids.utils import send_bid_update


@receiver(post_save, sender=Bid)
def bid_updated(sender, instance, created, **kwargs):
    if created:
        # Send the update (amount update) to the WebSocket group
        bid_data = BidSerializer(instance).data
        # Send the serialized data to the Celery task
        send_bid_update.delay(bid_data)

        # Retrieve the auction details
        auction = instance.auction

        # Fetch the top two bids
        top_bids = Bid.objects.filter(auction=auction).order_by('-amount')[:2]

        if top_bids.count() > 1:
            # The previous highest bid
            previous_bid = top_bids[1]
            # current highest bid
            current_bid = top_bids[0]

            previous_bidder = previous_bid.user
            cuurent_bidder = current_bid.user
            message = ''
            if previous_bidder == cuurent_bidder:
                message = f"you have upgraded a winning bid on auction{auction.product.title}"
            else:
                message = f"You have been outbid on auction {auction.product.title}"
            notification_type = "OUTBID"

            # Create a notification for the previous/current highest bidder
            Notification.objects.create(
                user=previous_bidder,
                message=message,
                type=notification_type,
                auction=auction
            )
