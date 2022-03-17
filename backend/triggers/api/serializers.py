from triggers.models import Trigger
from rest_framework.serializers import ModelSerializer

class TriggerSerializer(ModelSerializer):
    class Meta:
        model = Trigger
        fields = '__all__'
