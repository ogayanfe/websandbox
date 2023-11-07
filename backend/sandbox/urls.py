from django.urls import path

from sandbox.views import SandboxListCreateAPIView

urlpatterns = [
    path("", SandboxListCreateAPIView.as_view())
]