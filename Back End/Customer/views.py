import os
import random
from django.conf import settings
import requests
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import serializers

from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.contrib.sites.shortcuts import get_current_site
from django.contrib.auth import get_user_model
from django.utils.encoding import force_bytes

from Customer.tasks import send_otp_email_task
from .models import OTP, CustomUser
from .serializers import ChangePasswordSerializer, UserSerializer
from rest_framework.decorators import action
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken,OutstandingToken
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from django.core.files.base import ContentFile

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action in ['signup', 'google_login', 'verify_otp', 'resend_otp', 'reset_password']:
            self.permission_classes = [AllowAny]
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
        if serializer.is_valid():
            user = serializer.save()
            otp = self.generate_otp()
            OTP.objects.create(user=user, otp=otp)
            self.send_otp_email(user.email, otp)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
            otp_instance = OTP.objects.filter(user=user, otp=otp).latest('created_at')
            if otp_instance.is_valid():
                otp_instance.delete()  # OTP is valid, delete it
                user.is_verified = True
                user.save()
                return Response({"message": "OTP verified successfully"}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "OTP has expired"}, status=status.HTTP_400_BAD_REQUEST)
        except (CustomUser.DoesNotExist, OTP.DoesNotExist):
            return Response({"error": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=False, methods=['patch'], permission_classes=[IsAuthenticated],url_path='update-user')  
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
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        
        if not user.check_password(validated_data['old_password']):
            return Response({'detail': 'Old password is incorrect'}, status=status.HTTP_400_BAD_REQUEST)
        
        user.set_password(validated_data['new_password'])
        user.save()
        
        return Response({'status': 'Password updated successfully'}, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['post'], permission_classes=[AllowAny],url_path='password-reset-request')
    def forgot_password(self, request):
        email = request.data.get('email')
        if not email:
            return Response({"error": "Email not provided"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response({"error": "User with this email does not exist"}, status=status.HTTP_404_NOT_FOUND)

        # Generate password reset token
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.id))
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
            return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            uid = force_str(urlsafe_base64_decode(uid))
            user = get_user_model().objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, get_user_model().DoesNotExist):
            return Response({"error": "Invalid reset link"}, status=status.HTTP_400_BAD_REQUEST)

        if not default_token_generator.check_token(user, token):
            return Response({"error": "Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.auth_provider = 'local'
        user.save()

        # Invalidate all tokens for this user
        try:
            outstanding_tokens = OutstandingToken.objects.filter(user=user)
            for outstanding_token in outstanding_tokens:
                try:
                    # Directly blacklist using the token string
                    refresh_token = RefreshToken(outstanding_token.token)
                    if not BlacklistedToken.objects.filter(token = outstanding_token).exists():
                        refresh_token.blacklist()
                        outstanding_token.delete()

                except Exception as e:
                    print(f"Error while blacklisting token {outstanding_token.token}: {e}")

        except Exception as e:
            print(f"Error while blacklisting tokens: {e}")
            return Response({"error": "Failed to blacklist tokens"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"message": "Password reset successfully"}, status=status.HTTP_200_OK)


    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def google_login(self, request):
        credentialResponse = request.data.get('credentialResponse')
        if not credentialResponse:
            return Response({"error": "Token not provided"}, status=status.HTTP_400_BAD_REQUEST)
        token = credentialResponse['credential']
        try:
            idinfo = id_token.verify_oauth2_token(token, google_requests.Request(), settings.SOCIALACCOUNT_PROVIDERS['google']['APP']['client_id'])
            if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                raise ValueError('Wrong issuer.')
            email = idinfo['email']
            first_name = idinfo.get('given_name', '')
            last_name = idinfo.get('family_name', '')
            picture = idinfo.get('picture', '')
            user, created = CustomUser.objects.get_or_create(email=email, defaults={
                'first_name': first_name,
                'last_name': last_name,
                'email': email,
            })
            user.auth_provider = 'google'

            if picture and created:
                user.profile_picture.save(f'{user.email}_profile.jpg', ContentFile(requests.get(picture).content), save=True)
            if created:
                user.is_verified = True
            user.save()

            refresh = RefreshToken.for_user(user)
            serialized_user = self.get_serializer(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': serialized_user.data 
            }, status=status.HTTP_200_OK)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
