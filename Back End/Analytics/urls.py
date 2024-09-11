from django.urls import path
from .views import AuctionCompletionByCategoryView, AuctionCompletionTypeView, SalesReportView

urlpatterns = [
    path('sales', SalesReportView.as_view(), name='sales-report'),
    path('auction-completion-type',
         AuctionCompletionTypeView.as_view(), name='auction-completion-type'),
    path('auction-completion-by-category',
         AuctionCompletionByCategoryView.as_view(), name='auction-completion-by-category'),
]
