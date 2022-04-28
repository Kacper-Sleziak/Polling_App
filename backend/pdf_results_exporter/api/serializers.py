from rest_framework import serializers

class empty_serializer(serializers.Serializer):
    nothing =  serializers.CharField()

