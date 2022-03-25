from questions.models import Option, Question, QuestionType
from rest_framework.serializers import ModelSerializer


class QuestionTypeSerializer(ModelSerializer):
    class Meta:
        model = QuestionType
        fields = ('type_name', )


class QuestionSerializer(ModelSerializer):
    class Meta:
        model = Question
        fields = ('content', 'poll', 'question_type')


class OptionSerializer(ModelSerializer):
    class Meta:
        model = Option
        fields = ('content', 'question')
