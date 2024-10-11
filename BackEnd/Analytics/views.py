from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils.dateparse import parse_datetime
from django.db.models import Count, Q
from rest_framework import status
from django.core.exceptions import ValidationError

from Auction.models import Auction
from Auction.serializers import AuctionSerializer, AuctionWithProductSerializer
from Auction.services.auction_service import AuctionService, Utilities
from Product.models import Category
from QuickBids.pagination import CustomAuctionPagination
from django.utils.dateparse import parse_datetime


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


class AuctionBuyNowVsBidNowView(APIView):
    def get(self, request):
        # Get 'from_date' and 'to_date' from query params
        from_date = request.query_params.get('from_date')
        to_date = request.query_params.get('to_date')

        try:
            # Parse and validate the dates
            from_date = Utilities.parse_and_validate_date(from_date)
            to_date = Utilities.parse_and_validate_date(to_date)
        except ValidationError as e:
            # Return an error response if the date format is invalid
            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Retrieve sold auctions and apply date filtering if provided
        sold_auctions = AuctionService.sold_auctions(
            from_date=from_date, to_date=to_date
        )

        # Aggregating the count for 'buy now' and 'winning bids'
        data = sold_auctions.aggregate(
            buy_now_count=Count('id', filter=Q(winning_bid__isnull=True)),
            bid_won_count=Count('id', filter=Q(winning_bid__isnull=False)),
        )

        # Filter for auctions that were not sold (not active) and apply date filtering if provided
        not_active_count = AuctionService.not_sold_auctions(
            from_date=from_date, to_date=to_date
        )

        # Add 'not_active_count' to the response data
        data['not_active_count'] = not_active_count.count()

        return Response(data)


class AuctionCompletionByCategoryView(APIView):
    def get(self, request):
        from_date = request.query_params.get('from_date')
        to_date = request.query_params.get('to_date')

        # Parse the datetime if they are provided
        if from_date:
            from_date = parse_datetime(from_date)
        if to_date:
            to_date = parse_datetime(to_date)

        # Apply date filters if provided
        auctions = Auction.objects.all()
        if from_date and to_date:
            auctions = auctions.filter(end_time__range=[from_date, to_date])
        elif from_date:
            auctions = auctions.filter(end_time__gte=from_date)
        elif to_date:
            auctions = auctions.filter(end_time__lte=to_date)

        categories = Category.objects.filter(is_deleted=False)
        data = []

        # Loop over each category and count auction completions
        for category in categories:
            category_auctions = auctions.filter(product__category=category)

            buy_now_count = category_auctions.filter(
                winning_bid__isnull=True, winner__isnull=False
            ).count()

            bid_won_count = category_auctions.filter(
                winning_bid__isnull=False, winner__isnull=False
            ).count()

            not_active_count = category_auctions.filter(
                is_active=False, winner__isnull=True
            ).count()

            # Append data for each category
            data.append({
                'category': category.name,
                'buy_now_count': buy_now_count,
                'bid_won_count': bid_won_count,
                'not_active_count': not_active_count
            })

        return Response(data)
