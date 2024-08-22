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
    owner_id = serializers.IntegerField()

    class Meta:
        model = Product
        fields = [
            'id',
            'category_id',
            'title',
            'description',
            'owner_id',
            'buy_now_prize',
            'selected_state',
            'current_location',
            'images'
        ]


class FullProductImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = ProductImage
        fields = ['id', 'image']

    def get_image(self, obj):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(obj.image.url)
        return obj.image.url


class FullProductSerializer(ProductSerializer):
    images = FullProductImageSerializer(many=True, required=False)

    class Meta(ProductSerializer.Meta):
        fields = ProductSerializer.Meta.fields + ['images']
