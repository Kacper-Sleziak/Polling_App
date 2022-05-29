from questions.models import Option, Question, QuestionType
from answers.api.serializers import AnswerRelatedSerializer
from rest_framework.serializers import ModelSerializer,SerializerMethodField
from django.db.models import Count


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


class OptionSerializer(ModelSerializer):
    class Meta:
        model = Option
        fields = ('id', 'content', 'question')
        read_only_fields = ['id']



class QuestionRelatedSerializer(ModelSerializer):
    answer = AnswerRelatedSerializer(many=True)
    option = OptionSerializer(many=True)
    answer_count = SerializerMethodField()
    option_count = SerializerMethodField()
    class Meta:
        model = Question
        fields = ('content', 'question_type', 'required','answer_count','option','answer','option_count')
        read_only_fields = ['id']

    def get_answer_count(self,obj):
        return obj.answer.count()
    
    def get_option_count(self,obj):
        counter = (obj.answer.values('answerdetails__option_id')
        .annotate(count=Count('answerdetails__option_id'))
        .order_by())
        
        return counter


