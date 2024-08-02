from django.db import models
from Customer.models import CustomUser
from Product.models import Product

class Payment(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE,null=True,default=None)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    TRANSACTION_TYPE_CHOICES = [
        ('WALLET', 'Wallet'),
        ('RAZORPAY', 'Razorpay'),
    ]
    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPE_CHOICES,default='WALLET')
    transaction_id = models.CharField(max_length=255,default=None)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment by {self.user.username} - {self.amount}"


