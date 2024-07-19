from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Auction
from .serializers import AuctionSerializer

class AuctionViewSet(viewsets.ModelViewSet):
    queryset = Auction.objects.all()
    serializer_class = AuctionSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve','get_auction_by_product']:
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()

    @action(detail=False, methods=['get'], url_path='by-product/(?P<product_id>[^/.]+)')
    def get_auction_by_product(self, request, product_id=None):
        try:
            auction = Auction.objects.get(product__id=product_id, is_deleted=False)
            serializer = AuctionSerializer(auction)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Auction.DoesNotExist:
            return Response({'detail': 'Auction not found for this product'}, status=status.HTTP_404_NOT_FOUND)