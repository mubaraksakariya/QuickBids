from django.urls import path
from QuickBids.consumers import MyConsumer  # Import your WebSocket consumer

websocket_urlpatterns = [
    path('ws/somepath/', MyConsumer.as_asgi()),  # Replace with your path
]
