from django_filters import rest_framework as django_filters
from Payments.models import WithdrawalRequest


class WithdrawalRequestFilter(django_filters.FilterSet):
    from_date = django_filters.DateTimeFilter(
        field_name="requested_at", lookup_expr='gte')
    to_date = django_filters.DateTimeFilter(
        field_name="requested_at", lookup_expr='lte')
    status = django_filters.ChoiceFilter(
        choices=WithdrawalRequest.STATUS_CHOICES)

    class Meta:
        model = WithdrawalRequest
        fields = ['from_date', 'to_date', 'status']
