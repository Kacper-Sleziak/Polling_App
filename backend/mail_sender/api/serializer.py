from email import message
from rest_framework import serializers

class EmailSerializer(serializers.Serializer):
    message = serializers.CharField()
    slug = serializers.CharField(max_length=50)
    emails = serializers.ListField(
        child=serializers.EmailField()
    )
