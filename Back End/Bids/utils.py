from celery import shared_task
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


@shared_task
def send_bid_update(bid_data):
    data = {
        'message_type': 'bid_update',
        'bid': bid_data
    }
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(  # type: ignore
        f'auction_{bid_data["auction"]}',
        {
            'type': 'auction_message',
            'message': data
        }
    )
