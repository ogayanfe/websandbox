import queue
from django.shortcuts import render
from rest_framework.generics import RetrieveAPIView
from accounts.models import User
from accounts.serializers import UserInfoSerializer


class UserInfoAPIView(RetrieveAPIView):
    
    queryset = User.objects.all()
    serializer_class = UserInfoSerializer

    def get_object(self):
        return self.request.user