from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from django.db import transaction

from Auction.serializers import AuctionSerializer
from .models import Category, Product, ProductImage
from django.db.models import Q
from .serializers import CategorySerializer, ProductSerializer, ProductImageSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()

    @action(detail=False, methods=['post'])
    def create_or_get(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        category, created = Category.objects.get_or_create(
            name=serializer.validated_data['name'],
            defaults={'created_by': request.user}
        )
        return Response(self.get_serializer(category).data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['category', 'title']
    search_fields = ['title', 'description']
    
    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()
 
    @transaction.atomic
    def create(self, request, *args, **kwargs):
        try:
            # Step 1: Create or Get Category
            category_name = request.data.get('category')
            category, created = Category.objects.get_or_create(
                name=category_name,
                defaults={'created_by': request.user}
            )

            # Step 2: Create Product
            product_data = request.data.copy()
            product_data['category_id'] = category.id
            product_data['owner_id'] = request.user.id
            product_serializer = self.get_serializer(data=product_data)
            product_serializer.is_valid(raise_exception=True)
            product = product_serializer.save()

            # Step 3: Create Auction
            auction_data = {
                'product': product.id,  
                'initial_prize': request.data.get('initial_prize'),
                'start_time': request.data.get('start_time'),
                'end_time': request.data.get('end_time')
            }
            auction_serializer = AuctionSerializer(data=auction_data)
            auction_serializer.is_valid(raise_exception=True)
            # print(auction_serializer)
            auction_serializer.save()

            return Response(self.get_serializer(product).data, status=status.HTTP_201_CREATED)

        except Exception as e:
            print(e)
            transaction.set_rollback(True)
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    # current user products 
    @action(detail=False, methods=['get'], url_path='profile-products')
    def my_products(self, request):
        user = request.user
        user_products = Product.objects.filter(owner=user, is_deleted=False).order_by('-created_at')
        serializer = ProductSerializer(user_products, many=True)
        return Response(serializer.data)

    # overriden list to exclude logged in user products
    def list(self, request, *args, **kwargs):
        # Override default list method
        queryset = Product.objects.filter(is_deleted=False).order_by('-created_at')

        # Filter by category if provided
        category = request.query_params.get('category')
        if category:
            queryset = queryset.filter(category__id=category)

        # Search by title and description if provided
        search_query = request.query_params.get('search')
        if search_query:
            queryset = queryset.filter(
                Q(title__icontains=search_query) |
                Q(description__icontains=search_query)
            )
 
        # Exclude the user's own products if logged in
        if not request.user.is_anonymous:
            queryset = queryset.exclude(owner=request.user)
        # filter out products for not winner products
        queryset = queryset.filter(
            # auction__is_active=True, 
            auction__is_deleted=False,
            auction__winning_bid__isnull=True
        )
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    # products for home page Courosel
    @action(detail=False, methods=['get'], url_path='carousel-products')
    def carousel_products(self, request):
        queryset = Product.objects.filter(is_deleted=False).order_by('-created_at')
        if not request.user.is_anonymous:
            queryset = queryset.exclude(owner=request.user)
        queryset = queryset.filter(
            # auction__is_active=True, 
            auction__is_deleted=False,
            auction__winning_bid__isnull=True
        )
        serializer = self.get_serializer(queryset[:4], many=True)
        return Response(serializer.data)

class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    @action(detail=False, methods=['post'], url_path='upload/(?P<product_id>[^/.]+)')
    def upload_images(self, request, product_id=None):
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'detail': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        # Fetch all files with keys starting with 'images'
        images = [file for key, file in request.FILES.items() if key.startswith('images')]

        if not images:
            return Response({'detail': 'No images provided'}, status=status.HTTP_400_BAD_REQUEST)

        for image in images:
            ProductImage.objects.create(product=product, image=image)

        return Response({'detail': 'Images uploaded successfully'}, status=status.HTTP_200_OK)