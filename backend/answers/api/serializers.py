from answers.models import Answer, AnswerDetails
from rest_framework.serializers import ModelSerializer


class AnswerSerializer(ModelSerializer):
    class Meta:
        model = Answer
        fields = '__all__'
        read_only_fields = ['id']


class AnswerDetailsSerializer(ModelSerializer):
    class Meta:
        model = AnswerDetails
        fields = '__all__'
        read_only_fields = ['id']
