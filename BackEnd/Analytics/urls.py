from django.urls import path
from .views import AuctionCompletionByCategoryView, AuctionBuyNowVsBidNowView, SalesReportView

urlpatterns = [
    path('sales', SalesReportView.as_view(), name='sales-report'),
    path('auction-completion-type',
         AuctionBuyNowVsBidNowView.as_view(), name='auction-completion-type'),
    path('auction-completion-by-category',
         AuctionCompletionByCategoryView.as_view(), name='auction-completion-by-category'),
]
