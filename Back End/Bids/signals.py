from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Bid
from Bids.utils import send_bid_update

@receiver(post_save, sender=Bid)
def bid_updated(sender, instance, created, **kwargs):
    if created:
        # Send the update to the WebSocket group
        send_bid_update(instance)
