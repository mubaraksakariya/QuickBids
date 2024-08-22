import json
from channels.generic.websocket import AsyncWebsocketConsumer


class AuctionConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.auction_id = self.scope['url_route']['kwargs']['auction_id']
        self.room_group_name = f'auction_{self.auction_id}'

        # Join room group
        await self.channel_layer.group_add(  # type: ignore
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(  # type: ignore
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message_type = text_data_json.get('type')
        message = text_data_json.get('data')
        recipient_group = text_data_json.get('recipient_group')
        print(text_data_json.get('recipient_group'))
        if message_type and message:
            if recipient_group:
                # Forward message to the specific group if recipient_group is specified
                await self.channel_layer.group_send(  # type: ignore
                    recipient_group,
                    {
                        'type': 'auction_message',
                        'message': message
                    }
                )
            else:
                # Forward message to the room group
                await self.channel_layer.group_send(  # type: ignore
                    self.room_group_name,
                    {
                        'type': 'auction_message',
                        'message': message
                    }
                )

    async def auction_message(self, event):
        message = event['message']
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'data': message
        }))
