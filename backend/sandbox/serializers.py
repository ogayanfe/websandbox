from rest_framework.serializers import ModelSerializer

from sandbox.models import Sandbox

class SandboxSerializer(ModelSerializer): 
    class Meta: 
        model = Sandbox
        fields = '__all__'
        extra_kwargs = {
            "owner": {
                "read_only": True, 
            }           
        }

    def create(self, validated_data):
        # Am overiding this method so i can set the owner field
        request = self.context.get('request')
        validated_data["owner"] = validated_data.get("owner", request.user)
        obj = super().create(validated_data)
        return obj
