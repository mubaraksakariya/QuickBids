from celery import shared_task
from django.utils import timezone
from Auction.models import Auction

@shared_task
def check_ended_auctions():
    now = timezone.now()
    ended_auctions = Auction.objects.filter(end_time__lt=now, is_deleted=False)
    print('celery is working')
    for auction in ended_auctions:
        auction.is_active = False
        auction.save()
        print(f"Auction ended for product: {auction.product.title}")
