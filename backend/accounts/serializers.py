from rest_framework.serializers import ModelSerializer, ValidationError
from accounts.models import User


class UserInfoSerializer(ModelSerializer):

    class Meta: 
        model = User
        fields = ("id", "username", 'password', 'is_demo')
        extra_kwargs = {
            "password": {"write_only": True},
            "password": {"read_only": True}
        }

    def validate_username(self, value): 
        if User.objects.filter(username__iexact=value): 
            raise ValidationError("A user with that name already exists")
        return value.lower()

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user
    
    def update(self, instance, validated_data):
        if not validated_data.get("password"): 
            return super().update(instance, validated_data)
        
        password = validated_data.pop("password")
        for key, value in validated_data.items(): 
            setattr(instance, key, value)
            
        instance.set_password(password)
        instance.save()
        
        return instance