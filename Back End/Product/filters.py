from razorpay import Product
from Product.models import Category
from django_filters import rest_framework as django_filters


class CategoryFilter(django_filters.FilterSet):
    from_date = django_filters.DateTimeFilter(
        field_name="created_at", lookup_expr='gte')
    to_date = django_filters.DateTimeFilter(
        field_name="created_at", lookup_expr='lte')

    class Meta:
        model = Category
        fields = ['from_date', 'to_date']
