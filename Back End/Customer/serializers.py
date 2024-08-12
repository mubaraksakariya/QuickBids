from rest_framework.serializers import ModelSerializer, CharField
from Customer.models import CustomUser
from rest_framework import serializers


class UserSerializer(ModelSerializer):
    password = CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'auth_provider', 'email', 'password', 'id', 'is_verified', 'profile_picture', 'created_at']

    def create(self, validated_data):
        # Since auth_provider is set based on the authentication method, we don't include it in the create method.
        return CustomUser.objects.create_user(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            password=validated_data['password']
        )
    

    
class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    
    def validate_new_password(self, value):
        # You can add custom password validation logic here if needed
        return value
