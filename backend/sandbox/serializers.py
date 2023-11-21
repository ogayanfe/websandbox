from rest_framework.serializers import ModelSerializer, ValidationError

from sandbox.models import Sandbox

class SandboxSerializer(ModelSerializer): 
    class Meta: 
        model = Sandbox
        fields = '__all__'
        extra_kwargs = {
            "owner": {
                "read_only": True, 
            }, 
            "files": {
                "read_only": True
            }           
        }

    def create(self, validated_data):
        # Am overiding this method so i can set the owner field
        request = self.context.get('request')
        validated_data["owner"] = validated_data.get("owner", request.user)
        obj = super().create(validated_data)
        return obj

    def validate_title(self, value: str) -> str:
        request = self.context.get("request")
        if request and Sandbox.objects.filter(owner=request.user, title__iexact=value).exists(): 
            raise ValidationError("You have created a sandbox with similar name already")
        return value.lower()
    

class SandboxRetrieveUpdateSerializer(ModelSerializer):
    class Meta: 
        model = Sandbox
        fields = ["files"]

