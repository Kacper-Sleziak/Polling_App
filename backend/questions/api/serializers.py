from dataclasses import fields
from rest_framework.serializers import ModelSerializer
from questions.models import QuestionType, Question, Option


class QuestionTypeSerializer(ModelSerializer):
    class Meta:
        model = QuestionType
        fields = '__all__'
        
class QuestionSerializer(ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

class OptionSerializer(ModelSerializer):
    class Meta:
        model = Option
        fields = '__all__'