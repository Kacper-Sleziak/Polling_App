from django.forms import CharField
from rest_framework.serializers import Serializer, ListField

class EmailSerializer(Serializer):
    emails = ListField()
    message = CharField(min_length=1)