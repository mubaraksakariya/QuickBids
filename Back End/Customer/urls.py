from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('login', TokenObtainPairView.as_view(), name='login'),
    path('refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup',views.SignUp.as_view(),name='signup'),
    path('details', views.UserDetails.as_view(), name='hello_world'),
]