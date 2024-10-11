from rest_framework import serializers
from Customer.serializers import UserSerializer
from Product.models import Category


class CategorySerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Category
        fields = (
            'id', 'name', 'created_by', 'is_approved', 'created_at', 'updated_at', 'description', 'is_deleted'
        )
