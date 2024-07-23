from django.db.models.signals import post_save
from django.dispatch import receiver
from Customer.models import CustomUser
from .models import Wallet

@receiver(post_save, sender=CustomUser)
def create_wallet(sender, instance, created, **kwargs):
    if created:
        Wallet.objects.create(user=instance)
