from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Auction
from .serializers import AuctionSerializer, AuctionWithProductSerializer
from rest_framework import serializers

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
    
    @action(detail=True, methods=['get'], url_path='with-product-details')
    def get_auction_with_product(self, request, pk=None):
        try:
            auction = self.get_object()
            serializer = AuctionWithProductSerializer(auction)
            return Response(serializer.data)
        except Auction.DoesNotExist:
            return Response({'status': 'not found'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'], url_path='all-auctions')
    def get_all_auctions(self, request):
        active_auctions = Auction.objects.filter(is_active=False, is_deleted=False)
        serializer = AuctionSerializer(active_auctions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], url_path='active-auctions')
    def get_active_auctions(self, request):
        active_auctions = Auction.objects.filter(is_active=True, is_deleted=False)
        serializer = AuctionSerializer(active_auctions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated], url_path='user-active-auctions')
    def user_active_auctions(self, request):
        user = request.user

        active_auctions = Auction.objects.filter(
            bid__user=user,
            is_active=True,
        ).distinct()

        if not active_auctions.exists():
            return Response(
                {'message': 'You are not participating in any active auctions.'},
                status=status.HTTP_200_OK
            )

        serialized_auctions = AuctionSerializer(active_auctions, many=True).data
        return Response(serialized_auctions, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated], url_path='user-completed-auctions')
    def user_completed_auctions(self, request):
        won_auctions = Auction.objects.filter(winner=request.user)

        if not won_auctions.exists():
            return Response(
                {'message': 'You have not won any auctions. Good luck!'},
                status=status.HTTP_200_OK
            )

        serialized_auctions = AuctionSerializer(won_auctions, many=True).data
        return Response(serialized_auctions, status=status.HTTP_200_OK)


    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated], url_path='user-failed-auctions')
    def user_failed_auctions(self, request):
        failed_auctions = Auction.objects.filter(
            bid__user=request.user,
            is_active=False,
            winner__isnull=False 
        ).exclude(winner=request.user).distinct()

        if not failed_auctions.exists():
            return Response(
                {'message': 'Looks like you have won it all, congaradulation!!'},
                status=status.HTTP_200_OK
            )

        serialized_auctions = AuctionSerializer(failed_auctions, many=True).data
        return Response(serialized_auctions, status=status.HTTP_200_OK)