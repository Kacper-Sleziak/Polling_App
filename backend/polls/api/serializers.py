from polls.models import Poll
from rest_framework.serializers import ModelSerializer


class PollSerializer(ModelSerializer):
    class Meta:
        model = Poll
        fields = ('id', 'title', 'description', 'slug', 'start_date', 'end_date',
                  'create_date', 'filling', 'sent', 'status')
        read_only_fields = ['id', 'slug', 'create_date']
