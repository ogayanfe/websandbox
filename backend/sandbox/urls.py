from django.urls import path
from sandbox.views import (
    SandboxListCreateAPIView, 
    SandboxDestroyAPIView, 
    SandboxRetrieveUpdateAPIView, 
    SandboxStarAPIView, 
    DemoSandboxListAPIView
)

urlpatterns = [
    path("", SandboxListCreateAPIView.as_view()),
    path("<int:pk>/destroy/", SandboxDestroyAPIView.as_view()),
    path("demos/", DemoSandboxListAPIView.as_view()),
    path("<str:username>/<str:project>/", SandboxRetrieveUpdateAPIView.as_view()),
    path("<str:username>/<str:project>/starred/", SandboxStarAPIView.as_view()),
]
