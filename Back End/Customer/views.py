from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import User, UserSerializer 
# Create your views here.

class UserDetails(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "Hello, world!"})

class SignUp(APIView):
    # to bypass global permissions st in  settings.py
    permission_classes = [AllowAny]

    def post(self,request):
        serializer = UserSerializer (data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
