from polls.models import Poll
from rest_framework.serializers import ModelSerializer, ValidationError
from questions.api.serializers import QuestionRelatedSerializer


class PollSerializer(ModelSerializer):

    def validate(self, data):
        if data['start_date'] == None and data['end_date'] != None:
            raise ValidationError("Can't specify end date without start date")

        if data['end_date'] != None and data['start_date'] > data['end_date']:
            raise ValidationError("End date can't be before start date")
        return data

    class Meta:
        model = Poll
        fields = ('__all__')
        read_only_fields = ['id', 'slug', 'create_date']


class PollRelatedSerializer(ModelSerializer):
    question = QuestionRelatedSerializer(many=True)

    def validate(self, data):
        if data['start_date'] == None and data['end_date'] != None:
            raise ValidationError("Can't specify end date without start date")

        if data['end_date'] != None and data['start_date'] > data['end_date']:
            raise ValidationError("End date can't be before start date")
        return data

    class Meta:
        model = Poll
        fields = ('title', 'description', 'start_date', 'end_date',
                  'create_date', 'filling', 'sent', 'question')
        read_only_fields = ['id', 'slug', 'create_date', 'question']
