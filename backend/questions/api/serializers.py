from questions.models import Option, Question, QuestionType
from rest_framework.serializers import ModelSerializer


class QuestionTypeSerializer(ModelSerializer):
    class Meta:
        model = QuestionType
        fields = ('id', 'type_name')
        read_only_fields = ['id']


class QuestionSerializer(ModelSerializer):
    class Meta:
        model = Question
        fields = ('id', 'position', 'content', 'question_type')
        read_only_fields = ['id']


class OptionSerializer(ModelSerializer):
    class Meta:
        model = Option
        fields = ('id', 'content', )
        read_only_fields = ['id']
