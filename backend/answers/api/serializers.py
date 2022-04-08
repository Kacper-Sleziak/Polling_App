from answers.models import Answer, AnswerDetails
from rest_framework.serializers import ModelSerializer


class AnswerSerializer(ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'question_id']
        read_only_fields = ['id']


class AnswerDetailsSerializer(ModelSerializer):
    class Meta:
        model = AnswerDetails
        fields = ['id', 'answers_id', 'text_answer', 'option_id']
        read_only_fields = ['id']
