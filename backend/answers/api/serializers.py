from answers.models import Answer, Answers
from rest_framework.serializers import ModelSerializer


class AnswersSerializer(ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'question_id']
        read_only_fields = ['id']


class AnswerSerializer(ModelSerializer):
    class Meta:
        model = Answers
        fields = ['id', 'answers_id', 'text_answer', 'option_id']
        read_only_fields = ['id']
