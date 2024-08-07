from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Notification
from .serializers import NotificationSerializer

class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

    def get_permissions(self):
        if self.action in []:
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()

    @action(detail=False, methods=['get'], url_path='recent',permission_classes=[IsAuthenticated])
    def recent_notifications(self, request):
        user = request.user
        # Fetch the recent 10 notifications
        notifications = Notification.objects.filter(user=user,is_read = False).order_by('-created_at')
        if not notifications.exists():
            notifications = Notification.objects.filter(user=user).order_by('-created_at')[:5]
        serializer = self.get_serializer(notifications, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['patch'],permission_classes=[IsAuthenticated],url_path='mark-as-read')
    def mark_as_read(self, request, pk=None):
        try:
            notification = self.get_object()
            notification.is_read = True
            notification.save()
            return Response({'status': 'notification marked as read'})
        except Notification.DoesNotExist:
            return Response({'status': 'not found'}, status=status.HTTP_404_NOT_FOUND)
        

