from questions.models import Option, Question, QuestionType
from answers.api.serializers import AnswerRelatedSerializer
from rest_framework.serializers import ModelSerializer,SerializerMethodField


class QuestionTypeSerializer(ModelSerializer):
    class Meta:
        model = QuestionType
        fields = ('id', 'type_name')
        read_only_fields = ['id']


class QuestionSerializer(ModelSerializer):
    class Meta:
        model = Question
        fields = ('id', 'position', 'content', 'poll', 'question_type', 'required')
        read_only_fields = ['id']


class QuestionRelatedSerializer(ModelSerializer):
    answer = AnswerRelatedSerializer(many=True)
    answer_count = SerializerMethodField()
    class Meta:
        model = Question
        fields = ('content', 'question_type', 'required','answer_count','answer')
        read_only_fields = ['id']

    def get_answer_count(self,obj):
        return obj.answer.count()


class OptionSerializer(ModelSerializer):
    class Meta:
        model = Option
        fields = ('id', 'content', 'question')
        read_only_fields = ['id']
