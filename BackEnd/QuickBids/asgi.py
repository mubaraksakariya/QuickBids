import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from Auction.routing import websocket_urlpatterns as auction_urlpatterns
from Notifications.routing import websocket_urlpatterns as notifications_urlpatterns
from QuickBids.custom_middleware import TokenAuthMiddleware

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'QuickBids.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        TokenAuthMiddleware(
            URLRouter(
                auction_urlpatterns + notifications_urlpatterns
            )
        )
    ),
})
