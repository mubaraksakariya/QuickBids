from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Notification
from .utils import send_notification_to_user

@receiver(post_save, sender=Notification)
def handle_notification_post_save(sender, instance, created, **kwargs):
    if created:
        send_notification_to_user(instance)