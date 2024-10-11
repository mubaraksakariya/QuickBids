import os
import random
import requests

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import action
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken
from rest_framework import filters
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth import get_user_model
from django.utils.encoding import force_bytes
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as django_filters
from django.core.files.base import ContentFile

from Auction.services.auction_service import AuctionService
from Bids.services.bid_service import BidService
from Customer.tasks import send_otp_email_task
from QuickBids.pagination import CustomUserPagination
from Wallet.services.wallet_service import WalletService
from .models import OTP, CustomUser
from .serializers import AdminTokenObtainSerializer, ChangePasswordSerializer, UserTokenObtainSerializer, UserSerializer


from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
# user login


class UserFilter(django_filters.FilterSet):
    from_date = django_filters.DateTimeFilter(
        field_name="created_at", lookup_expr='gte')
    to_date = django_filters.DateTimeFilter(
        field_name="created_at", lookup_expr='lte')

    class Meta:
        model = CustomUser
        fields = ['from_date', 'to_date']


class UserTokenObtainView(TokenObtainPairView):
    serializer_class = UserTokenObtainSerializer

# admin login


class AdminTokenObtainView(TokenObtainPairView):
    serializer_class = AdminTokenObtainSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.filter(is_superuser=False)
    serializer_class = UserSerializer
    pagination_class = CustomUserPagination
    filter_backends = [DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['email', 'first_name', 'last_name']
    ordering_fields = ['email', 'first_name',
                       'last_name', 'is_active', 'created_at']
    filterset_class = UserFilter

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset

    def get_permissions(self):
        if self.action in ['signup', 'google_login', 'verify_otp', 'resend_otp', 'reset_password', 'forgot_password']:
            self.permission_classes = [AllowAny]
        elif self.action in ['list']:
            self.permission_classes = [IsAdminUser]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def logged_in_user(self, request):
        user = request.user
        serializer = self.get_serializer(user)
        return Response(serializer.data)

    @action(detail=True, methods=['get'], permission_classes=[IsAuthenticated])
    def retrieve_user(self, request, pk=None):
        try:
            user = CustomUser.objects.get(pk=pk)
            serializer = self.get_serializer(user)
            return Response(serializer.data)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def signup(self, request):
        serializer = self.get_serializer(data=request.data)
        try:
            # Validate and save the user
            serializer.is_valid(raise_exception=True)
            user = serializer.save()

            # Generate and send OTP
            otp = self.generate_otp()
            OTP.objects.create(user=user, otp=otp)
            self.send_otp_email(user.email, otp)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except ValidationError as e:
            # Decompose the error messages to a readable string format
            error_data = {
                # Flattening the error object to return it as a simple key-value pair
                "detail": f'{item}:{error[0].title()}' for item, error in e.detail.items()
            }
            return Response(error_data, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            # Catch unexpected errors and provide a generic message
            print("Unexpected signup error:", str(e))
            return Response(
                {"message": "An unexpected error occurred during signup."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def resend_otp(self, request):
        email = request.data.get('email')
        try:
            user = CustomUser.objects.get(email=email)
            otp = self.generate_otp()
            OTP.objects.create(user=user, otp=otp)
            # Use Celery to send the OTP email asynchronously
            send_otp_email_task.delay(
                subject='Your OTP for QuickBids Registration',
                message=f'Your OTP is {otp}. Please use this to complete your registration.',
                recipient_list=[email]
            )
            return Response({'message': 'OTP sent successfully.'}, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def generate_otp(self):
        return str(random.randint(100000, 999999))  # Generates a 6-digit OTP

    def send_otp_email(self, email, otp):
        subject = 'Your OTP for QuickBids Registration'
        message = f'Your OTP is {otp}. Please use this to complete your registration.'
        recipient_list = [email]
        # Use Celery to send the OTP email asynchronously
        send_otp_email_task.delay(subject, message, recipient_list)

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def verify_otp(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')
        if not email or not otp:
            return Response({"error": "Email and OTP are required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = CustomUser.objects.get(email=email)
            otp_instance = OTP.objects.filter(
                user=user, otp=otp).latest('created_at')
            if otp_instance.is_valid():
                otp_instance.delete()  # OTP is valid, delete it
                user.is_verified = True
                user.save()
                return Response({"message": "OTP verified successfully"}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "OTP has expired"}, status=status.HTTP_400_BAD_REQUEST)
        except (CustomUser.DoesNotExist, OTP.DoesNotExist):
            return Response({"error": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['patch'], permission_classes=[IsAuthenticated], url_path='update-user')
    def update_user(self, request, *args, **kwargs):
        user = self.request.user
        serializer = self.get_serializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK, headers=headers)

    @action(detail=False, methods=['patch'], url_path='change-password', permission_classes=[IsAuthenticated])
    def change_password_current_user(self, request):
        user = request.user
        serializer = ChangePasswordSerializer(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        if not user.check_password(
                validated_data['old_password']):  # type: ignore
            return Response({'detail': 'Old password is incorrect'}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(validated_data['new_password'])  # type: ignore
        user.save()

        return Response({'status': 'Password updated successfully'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'], permission_classes=[AllowAny], url_path='password-reset-request')
    def forgot_password(self, request):
        email = request.data.get('email')
        if not email:
            return Response({"detail": "Email not provided"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response({"detail": "User with this email does not exist"}, status=status.HTTP_404_NOT_FOUND)

        # Generate password reset token
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.id))  # type: ignore
        frontend_url = os.environ.get('FRONT_END_BASE_URL')
        reset_link = f"{frontend_url}/reset_password/?uid={uid}&token={token}"
        # Send email
        subject = "Password Reset Request"
        message = f"""
            Hi {user.first_name},

            We received a request to reset your password. Click the link below to reset it:

            {reset_link}

            If you did not request this change, please ignore this email.

            Thank you!
        """
        recipient_list = [user.email]
        send_otp_email_task.delay(subject, message, recipient_list)
        return Response({"message": "Password reset email sent"}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'], permission_classes=[AllowAny], url_path='reset-password')
    def reset_password(self, request):
        uid = request.data.get('uid')
        token = request.data.get('token')
        new_password = request.data.get('new_password')

        if not all([uid, token, new_password]):
            return Response({"detail": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            uid = force_str(urlsafe_base64_decode(uid))
            user = get_user_model().objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, get_user_model().DoesNotExist):
            return Response({"detail": "Invalid reset link"}, status=status.HTTP_400_BAD_REQUEST)

        if not default_token_generator.check_token(user, token):
            return Response({"detail": "Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.auth_provider = 'local'  # type: ignore
        user.save()

        # Invalidate all tokens for this user
        try:
            outstanding_tokens = OutstandingToken.objects.filter(user=user)
            for outstanding_token in outstanding_tokens:
                try:
                    # Directly blacklist using the token string
                    refresh_token = RefreshToken(
                        outstanding_token.token)  # type: ignore
                    blocked_token, created = refresh_token.blacklist()  # type: ignore
                    outstanding_token.delete()

                except Exception as e:
                    outstanding_token.delete()
                    print(
                        f"Error while blacklisting token {outstanding_token.token}: {e}")

        except Exception as e:
            print(f"Error while blacklisting tokens: {e}")
            return Response({"error": "Failed to blacklist tokens"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"message": "Password reset successfully"}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def google_login(self, request):
        credentialResponse = request.data.get('credentialResponse')

        # Check if token is provided
        if not credentialResponse:
            return Response({"error": "Token not provided"}, status=status.HTTP_400_BAD_REQUEST)

        token = credentialResponse.get('credential')
        if not token:
            return Response({"error": "Invalid credential format"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Verify the Google token
            idinfo = id_token.verify_oauth2_token(
                token,
                google_requests.Request(),
                settings.SOCIALACCOUNT_PROVIDERS['google']['APP']['client_id']
            )

            if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                raise ValueError('Wrong issuer.')

            email = idinfo.get('email')
            first_name = idinfo.get('given_name', '')
            last_name = idinfo.get('family_name', '')
            picture = idinfo.get('picture', '')

            # Get or create the user
            user, created = CustomUser.objects.get_or_create(email=email, defaults={
                'first_name': first_name,
                'last_name': last_name,
                'email': email,
            })

            # Check if the user is blocked
            if user.is_blocked:
                return Response({
                    "error": "This user is blocked."
                }, status=status.HTTP_400_BAD_REQUEST)

            # Set auth provider and handle profile picture if the user was newly created
            user.auth_provider = 'google'
            if picture and created:
                user.profile_picture.save(
                    f'{user.email}_profile.jpg',
                    ContentFile(requests.get(picture).content),
                    save=True
                )
            if created:
                user.is_verified = True
            user.save()

            # Generate and return JWT tokens
            refresh = RefreshToken.for_user(user)
            serialized_user = self.get_serializer(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),  # type: ignore
                'user': serialized_user.data
            }, status=status.HTTP_200_OK)

        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"error": "Something went wrong!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# For admin uses


    @action(detail=True, methods=['get'], permission_classes=[IsAdminUser])
    def user_extras(self, request, pk=None):
        try:
            user = self.get_object()  # Retrieve the user object using the pk

            # Calculate total auctions the user has won
            total_auctions = AuctionService.total_auction_won_by_user(
                user=user)

            # Calculate total auctions the user put bid for
            total_participations = AuctionService.total_auction_participation_by_user(
                user=user)

            # Calculate total buy now auctions
            total_buy_now = AuctionService.total_buy_now_by_user(user=user)

            # Get wallet details
            wallet = WalletService.get_wallet(user=user)
            if wallet is None:
                raise ValueError("Wallet not found for the user.")

            total_spend = WalletService.total_spend_by_user(user=user)

            # Calculate total bids the user has placed
            total_bids = BidService.total_bids_by_user(user=user)

            # Prepare the response data
            data = {
                'user': self.get_serializer(user).data,
                'total_auctions_won': total_auctions,
                'total_bids': total_bids,
                'total_participations': total_participations,
                'wallet_balance': wallet.balance,
                'total_spend': total_spend,
                'total_buy_now': total_buy_now,
            }

            return Response(data, status=status.HTTP_200_OK)

        except ValueError as e:
            # Handle specific errors, e.g., Wallet not found
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            # Handle unexpected errors
            print(e)
            return Response({'error': 'An unexpected error occurred: ' + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['get'], permission_classes=[IsAdminUser], url_path='recent-customers')
    def recent_customers(self, request):
        """
        Custom action to retrieve the latest 5 users.
        """
        queryset = CustomUser.objects.filter(
            is_superuser=False, is_staff=False).order_by('-created_at')[:4]
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['patch'], url_path='update-data', permission_classes=[IsAdminUser])
    def update_user_data(self, request, pk=None):
        user = self.get_object()
        profile_picture_remove = request.data.get(
            'profile_picture_remove') == 'true'
        is_active = request.data.get('is_active') == 'true'
        is_blocked = request.data.get('is_blocked') == 'true'

        # Create a dictionary with updated data
        request_data = {
            'first_name': request.data.get('first_name', user.first_name),
            'last_name': request.data.get('last_name', user.last_name or ''),
            'auth_provider': request.data.get('auth_provider', user.auth_provider),
            'is_active': is_active,
            'is_blocked': is_blocked,
            'profile_picture_remove': profile_picture_remove
        }

        old_profile_picture = user.profile_picture

        # Create a serializer instance with partial=True to update only the provided fields
        serializer = self.get_serializer(
            user, data=request_data, partial=True)

        if serializer.is_valid():
            # Save the user instance
            user = serializer.save()

            # Check if a new profile picture has been uploaded or if the existing one is to be removed
            if 'profile_picture' in request.FILES or profile_picture_remove:
                # Delete the old profile picture if it exists and is not the default
                if old_profile_picture and old_profile_picture != 'profile_pictures/default_profile_picture.jpeg':
                    old_profile_picture.delete(save=False)

                # If profile_picture_remove is True, set profile_picture to the default
                if profile_picture_remove:
                    user.profile_picture = 'profile_pictures/default_profile_picture.jpeg'

            user.save()  # Make sure to save the user instance again after updating profile_picture

            return Response(serializer.data, status=status.HTTP_200_OK)
        # print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
