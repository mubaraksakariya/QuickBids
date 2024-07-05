from django.db import models
from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer, CharField



class UserSerializer(ModelSerializer):
    password = CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password','id']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            # email=validated_data['email'],
            password=validated_data['password']
        )
        return user
