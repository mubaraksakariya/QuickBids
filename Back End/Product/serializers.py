from rest_framework import serializers
from .models import Category, Product, ProductImage

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, required=False)
    category_id = serializers.IntegerField()

    class Meta:
        model = Product
        fields = ['id', 'category_id', 'title', 'description', 'initial_prize', 'buy_now_prize', 'start_date', 'end_date', 'images']
