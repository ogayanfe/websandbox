from rest_framework.serializers import ModelSerializer, ValidationError
from accounts.models import User


class UserInfoSerializer(ModelSerializer):

    class Meta: 
        model = User
        fields = ("id", "username", 'password')
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def validate_username(self, value): 
        if User.objects.filter(username__iexact=value): 
            raise ValidationError("A user with that name already exists")
        return value.lower()
