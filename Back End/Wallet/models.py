from django.db import models
from django.conf import settings

from Customer.models import CustomUser

class Wallet(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return f"{self.user.email}'s Wallet"

class Transaction(models.Model):
    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE, related_name='transactions')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    TRANSACTION_TYPE_CHOICES = [
        ('DEPOSIT', 'Deposit'),
        ('WITHDRAWAL', 'Withdrawal'),
        ('PAYMENT', 'Payment'),
        ('TOPUP', 'Top-Up'),
        ('TRANSFER', 'Transfer'),
        ('REFUND','Refund'),
        ('AUCTION_SALE','Action_sale'),
        ('AUCTION_BUY_NOW','Auction_buy_now')
    ]
    transaction_type = models.CharField(max_length=20, choices=TRANSACTION_TYPE_CHOICES)
    transaction_id = models.CharField(max_length=255, null=True, blank=True) # Optional external transaction ID, can be bid_id for refund and paymen or 
    receiver_wallet = models.ForeignKey(Wallet, on_delete=models.SET_NULL, null=True, blank=True,related_name='received_transfers')  # For transfers or payments
    timestamp = models.DateTimeField(auto_now_add=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.transaction_type} of {self.amount} for {self.wallet.user.username}"