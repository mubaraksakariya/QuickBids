from django.core.exceptions import ValidationError
import json
from requests import delete
from rest_framework import serializers
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound
from rest_framework import filters

from django_filters.rest_framework import DjangoFilterBackend
from django.utils.dateparse import parse_datetime
from django.db import IntegrityError, transaction
from django.shortcuts import get_object_or_404
from django.db.models import Q

from QuickBids.pagination import CustomProductPagination
from Auction.serializers import AuctionSerializer
from Auction.services.auction_service import AuctionService
from Bids.services.bid_service import BidService
from Notifications.services.notification_service import NotificationService
from Product.services.product_services import ProductService
from Wallet.models import Wallet
from Wallet.services.wallet_service import WalletService
from .models import Category, Product, ProductImage
from .serializers import FullProductSerializer, ProductSerializer, ProductImageSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    pagination_class = CustomProductPagination
    filterset_fields = ['category', 'title']
    search_fields = ['title', 'description']

    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()

    def retrieve(self, request, *args, **kwargs):
        product = get_object_or_404(Product, id=kwargs['pk'])

        # Fetch the auction associated with the product
        auction = AuctionService.get_auction_by_product(
            product_id=product.id)  # type: ignore

        # Check if the user is privileged (e.g., is_staff or is_superuser)
        if not request.user.is_staff and not request.user.is_superuser:
            # If the user is not privileged, check the auction status
            if not auction or auction.winner:
                raise NotFound(detail="Product not found.")

        # Proceed with normal retrieval if the user is privileged or the product is valid
        serializer = self.get_serializer(product)
        return Response(serializer.data)

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
            product_data['category_id'] = category.id  # type: ignore
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
        user_products = ProductService.get_users_active_products(
            user=user)
        serializer = FullProductSerializer(user_products, many=True)
        return Response(serializer.data)

    # overriden list to exclude logged in user products
    def list(self, request, *args, **kwargs):
        # Override default list method
        queryset = Product.objects.filter(
            is_deleted=False).order_by('-created_at')

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
        # filter out products which are already completed auction
        queryset = queryset.filter(
            # auction__is_active=True,
            auction__is_deleted=False,
            auction__winner__isnull=True
        )

        # Apply pagination
        page = self.paginate_queryset(queryset)

        if page is not None:
            # Paginated response if pagination is applied
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    # products for home page Courosel
    @action(detail=False, methods=['get'], url_path='carousel-products')
    def carousel_products(self, request):
        queryset = Product.objects.filter(
            is_deleted=False).order_by('-created_at')
        if not request.user.is_anonymous:
            queryset = queryset.exclude(owner=request.user)
        queryset = queryset.filter(
            # auction__is_active=True,
            auction__is_deleted=False,
            auction__winner__isnull=True
        )
        serializer = self.get_serializer(queryset[:4], many=True)
        return Response(serializer.data)

    # purchase a product
    @transaction.atomic
    @action(detail=False, methods=['post'], url_path='buy-now')
    def buy_now(self, request):
        product_id = request.data.get('product_id')
        user = request.user

        try:
            # Retrieve the product
            product = Product.objects.get(id=product_id)

            # Check if product is available for buying
            ProductService.check_product_buyable(product=product)

            # Check if user has enough balance
            wallet = WalletService.get_wallet(user=user)
            WalletService.has_wallet_balance(
                wallet=wallet, amount=product.buy_now_prize)

            # Mark auction as completed
            auction = AuctionService.mark_as_bought(
                product_id=product_id, winner=user)

            # step 1
            # Refund the highest bidder if any
            highest_bid = BidService.get_highest_bid(auction=auction)
            if highest_bid:
                highest_bidder_wallet = WalletService.get_wallet(
                    user=highest_bid.user)
                WalletService.process_transaction(
                    wallet=highest_bidder_wallet,
                    amount=highest_bid.amount,
                    transaction_type='REFUND',
                    transaction_id=highest_bid.id  # type: ignore
                )
                NotificationService.create_notification(
                    user=highest_bid.user,
                    message='The product have been sold for buy now amount',
                    auction=auction,
                    type='OUTBID'
                )

            # step 2
            # Charge the buyer
            WalletService.process_transaction(
                wallet=wallet,
                amount=product.buy_now_prize,
                transaction_type='AUCTION_BUY_NOW',
                transaction_id=auction.id  # type: ignore
            )
            NotificationService.create_notification(
                user=user,
                message='Congradulations !! your purchase is succesfull',
                auction=auction,
                type='AUCTION_BUY_NOW'
            )

            # step 3
            # Fund the owner of the auction
            owner_wallet = WalletService.get_wallet(user=product.owner)
            WalletService.process_transaction(
                wallet=owner_wallet,
                amount=product.buy_now_prize,
                transaction_type='AUCTION_SALE',
                transaction_id=auction.id  # type: ignore
            )
            NotificationService.create_notification(
                user=product.owner,
                message='Congradulations !! your product have been sold',
                auction=auction,
                type='AUCTION_SALE'
            )
            return Response({'detail': 'Product purchased successfully.'}, status=status.HTTP_200_OK)

        except Product.DoesNotExist:
            return Response({'detail': 'Product not found.'}, status=status.HTTP_404_NOT_FOUND)

        except Wallet.DoesNotExist:
            return Response({'detail': 'Wallet not found.'}, status=status.HTTP_404_NOT_FOUND)

        except IntegrityError:
            # Handle database integrity issues
            return Response({'detail': 'Database error occurred. Please try again.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            # Catch-all for other exceptions
            return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # For Admin users only

    # update a product and its Auction
    @transaction.atomic
    @action(detail=True, methods=['patch'], url_path='update-product-auction', permission_classes=[IsAdminUser])
    def update_product_auction(self, request, pk=None):
        """
        Custom action to update product and its associated auction.
        """
        try:
            product = self.get_object()  # Get the product instance by ID (pk)
            auction = product.auction

            # Validate incoming data
            ProductService.validate_product_data_updation(
                data=request.data, auction=auction)

            # Extract data from the request
            title = request.data.get('title')
            category = request.data.get('category')
            buy_now_price = request.data.get('buyNowPrice')
            initial_prize = request.data.get('initialPrize')
            start_time = parse_datetime(request.data.get('startDate'))
            end_time = parse_datetime(request.data.get('endDate'))
            is_active = request.data.get('status') == 'active'
            description = request.data.get('description')
            images_to_remove = request.data.get('images_to_remove')

            # Update product fields
            if title:
                product.title = title
            if category:
                cat = Category.objects.filter(name=category).first()
                if cat:
                    product.category = cat
            if buy_now_price:
                product.buy_now_prize = buy_now_price
            if description:
                product.description = description

            # Handle file uploads (images)
            images = request.FILES.getlist('images')
            if images:
                for image in images:
                    ProductImage.objects.create(product=product, image=image)

            # Handle file deletion (image_id)
            if images_to_remove:
                images_to_remove = json.loads(images_to_remove)

                if images_to_remove:
                    # Count existing images
                    existing_image_count = product.images.count()

                    # Check if removing all images
                    if existing_image_count == len(images_to_remove):
                        return Response(
                            {"detail": "Removing all images is not allowed."},
                            status=status.HTTP_400_BAD_REQUEST
                        )

                    # Proceed with image removal if not all are being removed
                    for image_id in images_to_remove:
                        try:
                            # Ensure image_id is a valid integer
                            image_id = int(image_id)
                            ProductImage.objects.get(id=image_id).delete()
                        except (ValueError, ProductImage.DoesNotExist):
                            print(
                                f"Skipping invalid or non-existent image_id: {image_id}")
                            continue  # Skip to the next image_id if this one is invalid or doesn't exist

            # Update auction fields
            if initial_prize:
                auction.initial_prize = initial_prize
            if start_time:
                auction.start_time = start_time
            if end_time:
                auction.end_time = end_time
            if is_active is not None:
                auction.is_active = is_active

            # Save both instances
            product.save()
            auction.save()

            # Serialize updated data
            serializer = self.get_serializer(product)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except ValidationError as e:
            print(str(e))
            return Response({"detail": e}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)


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
        images = [file for key, file in request.FILES.items()
                  if key.startswith('images')]

        if not images:
            return Response({'detail': 'No images provided'}, status=status.HTTP_400_BAD_REQUEST)

        for image in images:
            ProductImage.objects.create(product=product, image=image)

        return Response({'detail': 'Images uploaded successfully'}, status=status.HTTP_200_OK)
