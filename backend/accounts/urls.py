from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from accounts.views import UserInfoAPIView, SignUpAPIView, UpdateProfileAPIView


urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("info/", UserInfoAPIView.as_view()),
    path("signup/", SignUpAPIView.as_view()),
    path("update/", UpdateProfileAPIView.as_view()),
]
