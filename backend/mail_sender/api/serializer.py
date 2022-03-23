from rest_framework import serializers

class EmailSerializer(serializers.Serializer):
    subject =  serializers.CharField()
    message = serializers.CharField()
    slug = serializers.CharField()
    emails = serializers.ListField(
        child=serializers.EmailField()
        )
