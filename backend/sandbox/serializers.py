from rest_framework.serializers import ModelSerializer, ValidationError, SerializerMethodField
from sandbox.models import Sandbox, get_default_files
from accounts.serializers import UserInfoSerializer

class SandboxSerializer(ModelSerializer):
    starred = SerializerMethodField()
    owner = UserInfoSerializer()

    class Meta: 
        model = Sandbox
        fields = '__all__'
        extra_kwargs = {
            "owner": {
                "read_only": True, 
            }, 
        }

    def create(self, validated_data):
        # Am overiding this method so i can set the owner field
        request = self.context.get('request') 
        validated_data["owner"] = validated_data.get("owner", request.user)
        validated_data["files"] = validated_data.get("files", get_default_files())
        obj = super().create(validated_data)
        return obj

    def validate_title(self, value: str) -> str:
        request = self.context.get("request")
        if request and Sandbox.objects.filter(owner=request.user, title__iexact=value).exists(): 
            raise ValidationError("You have created a sandbox with similar name already")
        return value.lower()
    
    def get_starred(self, sandbox): 
        user = self.context.get("user", None)
        if user is None: 
            raise ValidationError("Couldn't get user information")
        return sandbox.starred_users.filter(id=user.id).exists()


class SandboxRetrieveUpdateSerializer(ModelSerializer):
    is_owner = SerializerMethodField()
    owner = SerializerMethodField()

    class Meta: 
        model = Sandbox
        fields = ["files", "is_owner", 'owner', "title"]

    def get_is_owner(self, sandbox):
        user = self.context.get("user", None)
        return sandbox.owner == user

    def get_owner(self, sandbox): 
        return {
            "username": sandbox.owner.username,
            "id": sandbox.owner.id, 
        }