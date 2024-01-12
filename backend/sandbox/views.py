from rest_framework.generics import ListCreateAPIView, DestroyAPIView, RetrieveUpdateAPIView, CreateAPIView
from rest_framework.views import APIView
import sandbox
from sandbox.models import Sandbox
from sandbox.permission import IsOwnerOrReadOnly
from rest_framework.permissions import IsAuthenticated
from sandbox.serializers import SandboxRetrieveUpdateSerializer, SandboxSerializer
from django.shortcuts import get_object_or_404
from rest_framework.response import Response


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
    

class SandboxRetrieveUpdateAPIView(RetrieveUpdateAPIView): 
    permission_classes= [IsOwnerOrReadOnly]
    serializer_class = SandboxRetrieveUpdateSerializer

    def get_object(self):
        username = self.kwargs.get("username")
        project = self.kwargs.get("project")
        sandbox = get_object_or_404(Sandbox, owner__username=username, title=project)
        return sandbox
    
    def get_serializer_context(self):
        context =  super().get_serializer_context()
        context['user'] = self.request.user
        return context


class SandboxForkAPIView(CreateAPIView): 
    permission_classes = [IsAuthenticated]
    serializer_class = SandboxSerializer

    def get_queryset(self):
        project_username = self.kwargs.get("username", None)
        project_to_fork = self.kwargs.get("project" ,None)
        return Sandbox.objects.filter(owner__username=project_username, title=project_to_fork).exclude(user=self.request.user)

    def get_serializer_context(self):
        ctx = super().get_serializer_context()
        project_username = self.kwargs.get("username", )
        project_to_fork = self.kwargs.get("project")
        sandbox = get_object_or_404(Sandbox, owner__username=project_username, title=project_to_fork)
        ctx['project_files'] = sandbox.files
        return ctx