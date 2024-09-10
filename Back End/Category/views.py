from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.decorators import action
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from Auction.models import Auction
from Bids.models import Bid
from Category.serializers import CategorySerializer
from Product.filters import CategoryFilter
from Product.models import Category, Product
from QuickBids.pagination import CustomCategoryPagination
from django.db.models import Sum


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.filter(is_deleted=False, is_approved=True)
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    pagination_class = CustomCategoryPagination
    filter_backends = [filters.OrderingFilter,
                       DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['is_approved', 'created_by']
    search_fields = ['name']
    ordering_fields = '__all__'
    ordering = ['-created_at']
    filterset_class = CategoryFilter

    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()

    @action(detail=False, methods=['post'])
    def create_or_get(self, request):
        print(request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        category, created = Category.objects.get_or_create(
            name=serializer.validated_data['name'],
            description=serializer.validated_data['description'],
            defaults={'created_by': request.user}
        )
        return Response(self.get_serializer(category).data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)


# For admin uses
class AdminCategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.filter(is_deleted=False)
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    pagination_class = CustomCategoryPagination
    filter_backends = [filters.OrderingFilter,
                       DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['is_approved', 'created_by']
    search_fields = ['name']
    ordering_fields = '__all__'
    ordering = ['-created_at']
    filterset_class = CategoryFilter

    @action(detail=True, methods=['get'], permission_classes=[IsAdminUser], url_path='category-extras')
    def category_extras(self, request, pk=None):
        try:
            # Fetch the category
            category = self.get_object()

            # Fetching products in the category
            products = Product.objects.filter(
                category=category, is_deleted=False)

            # Aggregate statistics
            total_products = products.count()
            total_active_products = products.filter(
                auction__is_active=True).count()
            total_inactive_products = products.filter(
                auction__is_active=False).count()
            total_sold_items = products.filter(
                auction__winner__isnull=False).count()

            # Aggregate revenue
            buy_now_revenue_data = products.filter(
                auction__winner__isnull=False, auction__winning_bid__isnull=True
            ).aggregate(total_buy_now_revenue=Sum('buy_now_prize'))

            auction_revenue_data = products.filter(
                auction__winner__isnull=False, auction__winning_bid__isnull=False
            ).aggregate(total_auction_revenue=Sum('auction__winning_bid__amount'))

            total_revenue = (
                (buy_now_revenue_data['total_buy_now_revenue'] or 0) +
                (auction_revenue_data['total_auction_revenue'] or 0)
            )

            # Build and return response
            category_data = {
                'category': self.get_serializer(category).data,
                'total_products': total_products,
                'total_active_products': total_active_products,
                'total_inactive_products': total_inactive_products,
                'total_sold_items': total_sold_items,
                'total_revenue': total_revenue
            }

            return Response(category_data, status=status.HTTP_200_OK)

        except Category.DoesNotExist:
            return Response({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            # Log the error for debugging purposes
            print(f"Error in category_extras: {str(e)}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def create(self, request, *args, **kwargs):
        # Create a serializer instance with the data from the request
        serializer = self.get_serializer(data=request.data)
        # Check if the data is valid
        if serializer.is_valid():
            validated_data = serializer.validated_data

            # Check if a category with the same name already exists
            if Category.objects.filter(name=validated_data['name'], is_deleted=False).exists():
                print({'error': 'Category with this name already exists.'})
                return Response(
                    {'detail': 'Category with this name already exists.'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Create a new category
            category = Category.objects.create(
                name=validated_data['name'],
                description=validated_data.get('description', ''),
                created_by=request.user
            )

            # Serialize the category instance
            response_serializer = self.get_serializer(category)

            # Return a custom response for newly created category
            return Response(response_serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Return validation errors
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
