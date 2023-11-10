from rest_framework.serializers import ModelSerializer

from accounts.models import User


class UserInfoSerializer(ModelSerializer):

    class Meta: 
        model = User
        fields = ("id", "username", 'password')
        extra_kwargs = {
            "password": {"write_only": True}
        }