from email.policy import default
from rest_framework.serializers import ModelSerializer, CharField
from Customer.models import CustomUser
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(ModelSerializer):
    password = CharField(write_only=True)
    profile_picture = serializers.ImageField(use_url=True, required=False)
    is_active = serializers.BooleanField(required=False, default=True)
    is_blocked = serializers.BooleanField(required=False, default=False)
    last_name = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'auth_provider', 'email', 'is_superuser', 'is_staff',
                  'password', 'id', 'is_verified', 'profile_picture', 'created_at', 'is_active', 'is_blocked']

    def create(self, validated_data):
        return CustomUser.objects.create_user(  # type: ignore
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            password=validated_data['password'],
            is_active=validated_data.get('is_active', True),
            is_blocked=validated_data.get('is_blocked', False)
        )


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_new_password(self, value):

        return value


class UserTokenObtainSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # Call the original validate method
        data = super().validate(attrs)

        # check if the user is blocked
        if self.user.is_blocked == True:  # type: ignore
            raise serializers.ValidationError({
                "message": "This user is blocked!!."
            })
        # Check if the user is an admin (is_staff or is_superuser)
        if self.user.is_staff or self.user.is_superuser:  # type: ignore
            raise serializers.ValidationError({
                "message": "Admin users are not allowed to log in through this endpoint."
            })
        # Return the token and user information
        return data


class AdminTokenObtainSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # Call the original validate method
        data = super().validate(attrs)

        # check if the admin is blocked
        if self.user.is_blocked == True:  # type: ignore
            raise serializers.ValidationError({
                "message": "This user is blocked!!."
            })
        # Check if the user is an admin (is_staff or is_superuser)
        if not self.user.is_staff or not self.user.is_superuser:  # type: ignore
            raise serializers.ValidationError({
                "message": "Customers are not allowed to log in through this endpoint."
            })
        # Return the token and user information
        return data
