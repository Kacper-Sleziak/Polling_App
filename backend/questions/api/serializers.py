from dataclasses import fields
from rest_framework.serializers import ModelSerializer
from questions.models import QuestionType, Question, Option


class QuestionTypeSerializer(ModelSerializer):
    class Meta:
        model = QuestionType
        fields = ('type_name')


class QuestionSerializer(ModelSerializer):
    class Meta:
        model = Question
        fields = ('content', 'poll', 'question_type')
        read_only_fields = ('poll', 'question_type')


class OptionSerializer(ModelSerializer):
    class Meta:
        model = Option
        fields = ('content', 'question')
        read_only_fields = ('question')
