from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils.dateparse import parse_datetime
from django.db.models import Count, Q
from rest_framework import status

from Auction.models import Auction
from Auction.serializers import AuctionSerializer, AuctionWithProductSerializer
from Auction.services.auction_service import AuctionService
from Product.models import Category
from QuickBids.pagination import CustomAuctionPagination


class SalesReportView(APIView):
    """
    API endpoint to return detailed information about sold auctions with pagination.
    """

    def get(self, request):
        # Extract query parameters
        from_date = request.query_params.get('from_date', None)
        to_date = request.query_params.get('to_date', None)
        search_string = request.query_params.get('search', None)
        ordering = request.query_params.get('ordering', '-created_at')

        # Fetch sold auctions
        sold_auctions = AuctionService.sold_auctions()

        # Filtering based on from_date and to_date
        if from_date:
            from_date_parsed = parse_datetime(from_date)
            sold_auctions = sold_auctions.filter(
                created_at__gte=from_date_parsed)

        if to_date:
            to_date_parsed = parse_datetime(to_date)
            sold_auctions = sold_auctions.filter(
                created_at__lte=to_date_parsed)

        # Search by string in title, description, or category
        if search_string:
            sold_auctions = sold_auctions.filter(
                Q(product__title__icontains=search_string) |
                Q(product__description__icontains=search_string) |
                Q(product__category__name__icontains=search_string)
            )

        # Apply ordering
        sold_auctions = sold_auctions.order_by(ordering)

        # Apply pagination
        paginator = CustomAuctionPagination()
        page = paginator.paginate_queryset(sold_auctions, request)
        serializer = AuctionWithProductSerializer(
            page, many=True, context={'request': request})

        # Return paginated response
        return paginator.get_paginated_response(serializer.data)


class AuctionCompletionTypeView(APIView):
    def get(self, request):
        sold_auctions = AuctionService.sold_auctions()
        data = sold_auctions.aggregate(
            buy_now_count=Count('id', filter=Q(winning_bid__isnull=True)),
            bid_won_count=Count('id', filter=Q(winning_bid__isnull=False)),
        )
        not_active_count = AuctionService.not_sold_auctions().count()
        data['not_active_count'] = not_active_count
        return Response(data)


class AuctionCompletionByCategoryView(APIView):
    def get(self, request):
        categories = Category.objects.filter(is_deleted=False)
        data = []
        for category in categories:
            auctions = Auction.objects.filter(
                product__category=category, is_active=False)
            buy_now_count = auctions.filter(winning_bid__isnull=True).count()
            bid_won_count = auctions.filter(winning_bid__isnull=False).count()
            data.append({
                'category': category.name,
                'buy_now_count': buy_now_count,
                'bid_won_count': bid_won_count,
            })
        return Response(data)
