"""
URL configuration for QuickBids project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter

import Analytics
import Analytics.urls
from Auction.views import AuctionViewSet
from Category.views import AdminCategoryViewSet, CategoryViewSet
from Customer.views import AdminTokenObtainView, UserTokenObtainView, UserViewSet
from Payments.views import PaymentViewSet, PaymentWithdrawalViewSet
from Product.views import ProductViewSet, ProductImageViewSet
from Bids.views import BidViewSet, ProxyBidViewSet
from Wallet.views import TransactionViewSet, WalletViewSet
from Notifications.views import NotificationViewSet


router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'users', UserViewSet, basename='user')
router.register(r'product-images', ProductImageViewSet)
router.register(r'auctions', AuctionViewSet)
router.register(r'bids', BidViewSet)
router.register(r'proxy-bids', ProxyBidViewSet)
router.register(r'wallet', WalletViewSet, basename='wallet')
router.register(r'transactions', TransactionViewSet, basename='transaction')
router.register(r'notifications', NotificationViewSet, basename='notification')
router.register(r'payments', PaymentViewSet, basename='payments')
router.register(r'withdrawal', PaymentWithdrawalViewSet, basename='withdrawal')

router.register(r'admin/categories', AdminCategoryViewSet,
                basename='admin/categories')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login/', UserTokenObtainView.as_view(), name='login'),
    path('api/admin/login/', AdminTokenObtainView.as_view(), name='admin_login'),
    path('api/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/report/', include(Analytics.urls)),
    path('api/', include(router.urls)),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
