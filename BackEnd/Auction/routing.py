from django.urls import re_path
from .consumers.auction_consumer import AuctionConsumer

websocket_urlpatterns = [
    re_path(r'ws/auction/(?P<auction_id>\d+)/$', AuctionConsumer.as_asgi()),
]
