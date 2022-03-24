from rest_framework.serializers import ModelSerializer
from polls.models import Poll


class PollSerializer(ModelSerializer):
    class Meta:
        model = Poll
        fields = ('title', 'description', 'start_date', 'end_date',
                  'create_date', 'filling', 'sent', 'status', 'author')
        read_only_fields = ['create_date', 'author']
