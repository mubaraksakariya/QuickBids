# products/models.py
from django.db import models
from Customer.models import CustomUser

class Category(models.Model):
    name = models.CharField(max_length=100)
    created_by = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    is_approved = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    edited_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()
    initial_prize = models.DecimalField(max_digits=10, decimal_places=2)
    buy_now_prize = models.DecimalField(max_digits=10, decimal_places=2)
    selected_state = models.CharField(max_length=100,null=True,blank=True)
    current_location = models.JSONField(null=True, blank=True)  # Storing location as a JSON object
    start_date = models.DateField()
    end_date = models.DateField()
    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    edited_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='product_images/')
    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    edited_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Image for {self.product.title}"