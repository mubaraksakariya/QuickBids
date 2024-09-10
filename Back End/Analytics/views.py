from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Sum, Count


class SalesReportView(APIView):
    """
    API endpoint to return analytical sales data.
    """

    def get(self, request):
        report_data = {'data': [1, 2, 3, 6, 5, 4, 8, 8]}
        return Response(report_data, status=status.HTTP_200_OK)
