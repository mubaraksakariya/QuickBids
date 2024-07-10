import random
from django.conf import settings
import requests
from django.core.mail import send_mail
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import OTP, CustomUser
from .models import UserSerializer
from rest_framework.decorators import action
from rest_framework_simplejwt.tokens import RefreshToken
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django.core.files.base import ContentFile

class UserViewSet(viewsets.ViewSet):
    def get_permissions(self):
        if self.action in ['signup','google_login','verify_otp','resend_otp']:
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()
    

    
    
    def list(self, request):
        users = CustomUser.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        user = CustomUser.objects.get(pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def logged_in_user(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)
    

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def signup(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            otp = self.generate_otp()
            OTP.objects.create(user=user, otp=otp)

            # Send OTP email
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

            # Send OTP via email
            self.send_otp_email(user.email, otp)

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
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [email]
        send_mail(subject, message, email_from, recipient_list)

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




    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def google_login(self, request):
        credentialResponse = request.data.get('credentialResponse')
        # print(credentialResponse)
        if not credentialResponse:
            return Response({"error": "Token not provided"}, status=status.HTTP_400_BAD_REQUEST)
        token = credentialResponse['credential']
        
        try:
            # Verify the token using the Google OAuth2 API
            idinfo = id_token.verify_oauth2_token(token, google_requests.Request(), settings.SOCIALACCOUNT_PROVIDERS['google']['APP']['client_id'])
            if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                raise ValueError('Wrong issuer.')
             # Extract user info from the token
            # print(idinfo)
            email = idinfo['email']
            first_name = idinfo.get('given_name', '')
            last_name = idinfo.get('family_name', '')
            picture = idinfo.get('picture', '')

             # Create or get the user
            user, created = CustomUser.objects.get_or_create(email=email, defaults={
                'first_name': first_name,
                'last_name': last_name,
                'email': email
            })

            # Update profile picture if available
            if picture and created:
                user.profile_picture.save(f'{user.email}_profile.jpg', ContentFile(requests.get(picture).content), save=True)
            if created:
                user.is_verified = True
                user.save()
            # create token
            refresh = RefreshToken.for_user(user)

            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'profile_picture': user.profile_picture.url if user.profile_picture else None,
                }
            }, status=status.HTTP_200_OK)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)    
        
        return Response({'credentialResponse':credentialResponse})