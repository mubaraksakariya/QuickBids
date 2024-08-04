from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

from Bids.serializers import BidSerializer

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
