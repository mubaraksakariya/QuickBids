from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from Bids.serializers import BidSerializer
from Notifications.serializers import NotificationSerializer

def send_bid_update(bid):
    bid_data = BidSerializer(bid).data
    data = {
        'message_type': 'bid_update',
        'bid': bid_data
    }
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f'auction_{bid.auction.id}',
        {
            'type': 'auction_message',
            'message': data
        }
    )

# def send_notification_to_previous_bidder(user,notification):
    
#     # Prepare notification data using serializers
#     notification_data = NotificationSerializer(notification).data
    
#     group_name = f'user_{user.id}'
#     channel_layer = get_channel_layer()
#     async_to_sync(channel_layer.group_send)(
#         group_name,
#         {
#             'type': 'notification_message',
#             'notification': notification_data
#         }
#     )
