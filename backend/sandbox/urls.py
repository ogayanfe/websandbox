from django.urls import path

from sandbox.views import SandboxListCreateAPIView, SandboxDestroyAPIView

urlpatterns = [
    path("", SandboxListCreateAPIView.as_view()),
    path("<int:pk>/destroy/", SandboxDestroyAPIView.as_view())
]