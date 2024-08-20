from ctypes import pointer
from rest_framework import serializers

from Notifications.models import Notification


class NotificationService:
    @staticmethod
    def create_notification(user, message, product=None, target_user=None, auction=None, type='SYSTEM_ALERT'):
        notification = Notification.objects.create(
            user=user,
            message=message,
            type=type,
            product=product,
            target_user=target_user,
            auction=auction
        )
        return notification
