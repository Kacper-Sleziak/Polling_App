from polls.models import Poll
from rest_framework.serializers import ModelSerializer, ValidationError


class PollSerializer(ModelSerializer):

    def validate(self, data):
        if data['start_date'] == None and data['end_date'] != None:
            raise ValidationError("Can't specify end date without start date")

        if data['start_date'] > data['end_date']:
            raise ValidationError("End date can't be before start date")
        return data

    class Meta:
        model = Poll
        fields = ('__all__')
        read_only_fields = ['id', 'slug', 'create_date']
