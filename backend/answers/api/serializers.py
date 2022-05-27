from answers.models import Answer, AnswerDetails
from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import PrimaryKeyRelatedField


class AnswerDetailsSerializer(ModelSerializer):
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

    class Meta:
        model = Answer
        fields = ['answerdetails']
        read_only_fields = ['id']
