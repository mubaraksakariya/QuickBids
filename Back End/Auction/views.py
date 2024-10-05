from datetime import datetime
from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.decorators import action
from rest_framework.response import Response

from django.db.models.functions import TruncMonth, TruncDay
from django.utils import timezone
from django.db.models import Count
from django.utils.dateparse import parse_datetime

from Auction.services import auction_service
from QuickBids.pagination import CustomAuctionPagination
from .models import Auction
from .serializers import AuctionSerializer, AuctionWithProductSerializer


class AuctionViewSet(viewsets.ModelViewSet):
    queryset = Auction.objects.all()
    serializer_class = AuctionSerializer
    pagination_class = CustomAuctionPagination

    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'get_auction_by_product']:
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()

    @action(detail=False, methods=['get'], url_path='by-product/(?P<product_id>[^/.]+)')
    def get_auction_by_product(self, request, product_id=None):
        try:
            auction = Auction.objects.get(
                product__id=product_id, is_deleted=False)
            serializer = self.get_serializer(auction)
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
        active_auctions = Auction.objects.filter(
            is_active=False, is_deleted=False)
        serializer = self.get_serializer(active_auctions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], url_path='active-auctions')
    def get_active_auctions(self, request):
        active_auctions = Auction.objects.filter(
            is_active=True, is_deleted=False)
        serializer = AuctionWithProductSerializer(active_auctions, many=True)
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

        serialized_auctions = AuctionWithProductSerializer(
            active_auctions, many=True, context={'request': request}).data
        return Response(serialized_auctions, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated], url_path='user-completed-auctions')
    def user_completed_auctions(self, request):
        won_auctions = Auction.objects.filter(winner=request.user)

        if not won_auctions.exists():
            return Response(
                {'message': 'You have not won any auctions. Good luck!'},
                status=status.HTTP_200_OK
            )

        serialized_auctions = AuctionWithProductSerializer(
            won_auctions, many=True, context={'request': request}).data
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

        serialized_auctions = AuctionWithProductSerializer(
            failed_auctions, many=True, context={'request': request}).data
        return Response(serialized_auctions, status=status.HTTP_200_OK)


# for admin side

    @action(detail=False, methods=['get'], permission_classes=[IsAdminUser])
    def sales_data(self, request):
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')

        if not start_date or not end_date:
            # Default to current year if no dates provided
            now = timezone.now()
            start_date = now.replace(month=1, day=1)
            end_date = now

        # Convert start_date and end_date to datetime objects
        start_date = datetime.strptime(start_date, '%Y-%m-%d')  # type: ignore
        end_date = datetime.strptime(end_date, '%Y-%m-%d')  # type: ignore
        # Set the end_date's time to 11:59:59 PM (23:59:59)
        end_date = end_date.replace(hour=23, minute=59, second=59)

        # Calculate the difference in days between start_date and end_date
        date_diff = (end_date - start_date).days

        # Choose aggregation based on the date range
        if date_diff >= 30:
            # Aggregate by month if the date range is 30 days or more
            sales_data = Auction.objects.filter(
                created_at__range=[start_date, end_date],
                winner__isnull=False
            ).annotate(
                period=TruncMonth('updated_at')
            ).values('period').annotate(
                sales_count=Count('id')
            ).order_by('period')
        else:
            # Aggregate by day if the date range is less than 30 days
            sales_data = Auction.objects.filter(
                created_at__range=[start_date, end_date],
                winner__isnull=False
            ).annotate(
                period=TruncDay('updated_at')
            ).values('period').annotate(
                sales_count=Count('id')
            ).order_by('period')

        return Response(sales_data)

    @action(detail=False, methods=['get'], permission_classes=[IsAdminUser])
    def total_sales(self, request):
        # Calculate total sales amount
        total_sales = auction_service.AuctionService.total_sales()

        return Response(total_sales)

    @action(detail=False, methods=['get'], permission_classes=[IsAdminUser])
    def total_auctions(self, request):
        total_auctions = auction_service.AuctionService.total_auctions()

        return Response(total_auctions)

    @action(detail=False, methods=['get'], permission_classes=[IsAdminUser], url_path='filter-auctions')
    def filter_auctions(self, request):
        """
        Custom action to filter auctions based on date range, product search string, and sorting.
        """
        from_date = request.query_params.get('from_date', None)
        to_date = request.query_params.get('to_date', None)
        search_string = request.query_params.get('search', None)
        ordering = request.query_params.get('sorting', '-created_at')
        queryset = Auction.objects.all()

        if from_date:
            from_date = parse_datetime(from_date)
            queryset = queryset.filter(created_at__gte=from_date)

        if to_date:
            to_date = parse_datetime(to_date)
            queryset = queryset.filter(created_at__lte=to_date)

        if search_string:
            queryset = queryset.filter(product__title__icontains=search_string)

        # Apply ordering
        if ordering:
            queryset = queryset.order_by(ordering)

        # Apply pagination
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = AuctionWithProductSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        # If pagination is not applied
        serializer = AuctionWithProductSerializer(queryset, many=True)
        return Response(serializer.data)
