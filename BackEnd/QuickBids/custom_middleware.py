from channels.middleware import BaseMiddleware
from channels.db import database_sync_to_async

class TokenAuthMiddleware(BaseMiddleware):
    @database_sync_to_async
    def get_user(self, token_key):
        from django.contrib.auth.models import AnonymousUser
        from rest_framework_simplejwt.tokens import AccessToken
        from django.contrib.auth import get_user_model
        User = get_user_model()

        try:
            token = AccessToken(token_key)
            user_id = token['user_id']
            return User.objects.get(pk=user_id)
        except Exception:
            return AnonymousUser()

    async def __call__(self, scope, receive, send):
        # Get token from query parameters
        from django.contrib.auth.models import AnonymousUser
        query_params = scope['query_string'].decode()
        token_key = None
        for param in query_params.split('&'):
            if param.startswith('token='):
                token_key = param.split('=')[1]
                break

        # Authenticate user
        scope['user'] = await self.get_user(token_key) if token_key else AnonymousUser()
        
        return await super().__call__(scope, receive, send)
