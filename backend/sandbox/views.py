from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, DestroyAPIView
from sandbox.models import Sandbox
from sandbox.serializers import SandboxSerializer

# Create your views here.
class SandboxListCreateAPIView(ListCreateAPIView):
    serializer_class = SandboxSerializer

    def get_serializer_context(self):
        ctx = super().get_serializer_context()
        ctx["request"] = self.request
        return ctx 

    def get_queryset(self):
        return Sandbox.objects.filter(owner=self.request.user)

class SandboxDestroyAPIView(DestroyAPIView): 

    def get_queryset(self):
        return Sandbox.objects.filter(owner=self.request.user)