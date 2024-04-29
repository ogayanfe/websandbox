from django.urls import include
from rest_framework.generics import ListCreateAPIView, DestroyAPIView, RetrieveUpdateAPIView, UpdateAPIView
from rest_framework.response import Response
from sandbox.models import Sandbox
from sandbox.permission import IsOwnerOrReadOnly
from sandbox.serializers import SandboxRetrieveUpdateSerializer, SandboxSerializer
from django.shortcuts import get_object_or_404

# Create your views here.
class SandboxListCreateAPIView(ListCreateAPIView):
    serializer_class = SandboxSerializer

    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)
    
    def get_queryset(self):
        filter = None
        try: 
            filter = self.request.GET["filter"]
        except:
            pass
        if filter == "starred": 
            return self.request.user.starred.all() 
        return Sandbox.objects.filter(owner=self.request.user)

    def get_serializer_context(self):
        context =  super().get_serializer_context()
        context['user'] = self.request.user
        return context


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


class SandboxStarAPIView(UpdateAPIView): 
    serializer_class = SandboxRetrieveUpdateSerializer
    
    def get_object(self):
        username = self.kwargs.get("username")
        project = self.kwargs.get("project")
        sandbox = get_object_or_404(Sandbox, owner__username=username, title=project)
        return sandbox

    def patch(self, request, *args, **kwargs):
        print("The reason for the economic")
        return super().patch(request, *args, **kwargs)
    
    def update(self, request, *args, **kwargs):
        sandbox = self.get_object()
        user = self.request.user
        if sandbox.starred_users.contains(user): 
            sandbox.starred_users.remove(user)
        else: 
            sandbox.starred_users.add(user)
        return Response({"starred": sandbox.starred_users.contains(user)})