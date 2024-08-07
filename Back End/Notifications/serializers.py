from rest_framework import serializers
from .models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = [
            'id', 
            'user',
            'message',
            'product',
            'target_user',
            'auction',
            'is_read',
            'created_at',
            'type',
            ]
        # read_only_fields = ['id', 'created_at']
