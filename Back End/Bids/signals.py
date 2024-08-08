from django.db.models.signals import post_save
from django.dispatch import receiver
from Notifications.models import Notification
from .models import Bid
from Bids.utils import send_bid_update

@receiver(post_save, sender=Bid)
def bid_updated(sender, instance, created, **kwargs):
    if created:
        # Send the update to the WebSocket group
        send_bid_update(instance)
        
        # Retrieve the auction details
        auction = instance.auction
        
        # Fetch the top two bids
        top_bids = Bid.objects.filter(auction=auction).order_by('-amount')[:2]

        if top_bids.count() > 1:
            # The previous highest bid
            previous_bid = top_bids[1]
            previous_bidder = previous_bid.user
            message = f"You have been outbid on auction {auction.product.title}"
            notification_type = "OUTBID"

            # Create a notification for the previous highest bidder
            Notification.objects.create(
                user=previous_bidder,
                message=message,
                type=notification_type,
                auction=auction
            )
            
            # # Send notification to the previous highest bidder
            # send_notification_to_previous_bidder(
            #     user=previous_bidder,
            #     notification = notification
            # )
