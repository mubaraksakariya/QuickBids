from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import CustomUser
from Notifications.models import Notification
from Wallet.models import Wallet

@receiver(post_save, sender=CustomUser)
def create_user_notification(sender, instance, created, **kwargs):
    if created:
        print('user', instance)
        message = f"Welcome {instance.first_name}! Happy Biddig!!."
        Notification.objects.create(
            user=instance,
            message=message,
            type='NEW_USER'
        )
