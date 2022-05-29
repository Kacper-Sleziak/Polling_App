
from answers.models import Answer, AnswerDetails, Option
from questions.models import Option,Question
from rest_framework.serializers import ModelSerializer,SerializerMethodField,PrimaryKeyRelatedField
from django.db.models import Count



class AnswerDetailsSerializer(ModelSerializer):
#    option_content = SerializerMethodField()
    class Meta:
        model = AnswerDetails
        fields = ('answers_id', 'text_answer', 'option_id')
        read_only_fields = ['id']


class AnswerSerializer(ModelSerializer):
    class Meta:
        model = Answer
        fields = '__all__'
        read_only_fields = ['id']


class AnswerRelatedSerializer(ModelSerializer):
    answerdetails = AnswerDetailsSerializer(many=True)
    #option_count = SerializerMethodField()
    class Meta:
        model = Answer
        fields = ['answerdetails']
        read_only_fields = ['id']

    # def get_option_count(self,obj):
    #     counter = obj.answerdetails.values('option_id').annotate(count=Count('option_id')).order_by()
    #     return counter
