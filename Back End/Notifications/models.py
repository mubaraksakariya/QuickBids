from django.db import models
from Auction.models import Auction
from Customer.models import CustomUser
from Product.models import Product

class Notification(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE,related_name='notifications')
    message = models.TextField()
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True)
    target_user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True)
    auction = models.ForeignKey(Auction, on_delete=models.SET_NULL, null=True, blank=True)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    type = models.CharField(max_length=50, choices=[
        ('OUTBID', 'Outbid'),
        ('WIN', 'Auction Win'),
        ('LOSING_BID', 'Losing Bid'),
        ('BID_PLACED', 'Bid Placed'),
        ('AUCTION_START','Auction started'),
        ('AUCTION_END','Auction ended'),
        ('SYSTEM_ALERT','System alert'),
        ('NEW_USER','New user'),
        # Add more types as needed
    ])

    def __str__(self):
        return f"{self.user.email} - {self.message[:20]}"