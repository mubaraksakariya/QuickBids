from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from Notifications.serializers import NotificationSerializer

def send_notification_to_user(notification):
    user = notification.user
    notification_data = NotificationSerializer(notification).data
    
    group_name = f'user_{user.id}'
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        group_name,
        {
            'type': 'notification_message',
            'notification': notification_data
        }
    )
