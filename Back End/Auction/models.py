from django.db import models
from Product.models import Product

class Auction(models.Model):
    product = models.OneToOneField(Product, on_delete=models.CASCADE)
    initial_prize = models.DecimalField(max_digits=10, decimal_places=2)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Auction for {self.product.name}"  # Fixed reference to 'product'