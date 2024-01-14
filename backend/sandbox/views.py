from rest_framework.generics import ListCreateAPIView, DestroyAPIView, RetrieveUpdateAPIView
from sandbox.models import Sandbox
from sandbox.permission import IsOwnerOrReadOnly
from sandbox.serializers import SandboxRetrieveUpdateSerializer, SandboxSerializer
from django.shortcuts import get_object_or_404


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
