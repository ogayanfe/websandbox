from rest_framework.generics import RetrieveAPIView, CreateAPIView, UpdateAPIView
from accounts.models import User
from accounts.serializers import UserInfoSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status

from sandbox import serializers

def get_user_tokens(user: User): 
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh), 
        'access': str(refresh.access_token),
    }

class UserInfoAPIView(RetrieveAPIView):
    
    queryset = User.objects.all()
    serializer_class = UserInfoSerializer

    def get_object(self):
        return self.request.user
    

class SignUpAPIView(CreateAPIView): 
    model = User
    serializer_class = UserInfoSerializer
    permission_classes = []
    authentication_classes = []

    def perform_create(self, serializer): 
        # Overode this method because this function does not return the created instance by default
        return serializer.save()

    def create(self, request, *_args, **_kwargs): 
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        instance = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        tokens = get_user_tokens(instance)
        return Response(tokens, status=status.HTTP_201_CREATED, headers=headers)

class UpdateProfileAPIView(UpdateAPIView): 
    model = User
    serializer_class = UserInfoSerializer
    queryset = User.objects

    def get_object(self): 
        return self.request.user