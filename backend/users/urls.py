
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from users.views import RegisterView, CustomTokenObtainPairView, UserInfoView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/', UserInfoView.as_view(), name='user-info'),
]
