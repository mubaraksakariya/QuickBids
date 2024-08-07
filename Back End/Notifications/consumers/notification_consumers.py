import json
from channels.generic.websocket import AsyncWebsocketConsumer

class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope['user']
        if self.user.is_authenticated:
            self.room_group_name = f'user_{self.user.id}'
            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )
            await self.accept()
        else:
            await self.close()

    async def disconnect(self, close_code):
        if hasattr(self, 'room_group_name'):
            await self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name
            )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        print(message)
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'notification_message',
                'notification': message
            }
        )
    
    async def notification_message(self, event):
        # Send notification to WebSocket
        notification = event['notification']
        print(notification)
        await self.send(text_data=json.dumps({
            'notification': notification
        }))
