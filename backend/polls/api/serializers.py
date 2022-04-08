from polls.models import Poll
from rest_framework.serializers import ModelSerializer


class PollSerializer(ModelSerializer):
    class Meta:
        model = Poll
        fields = ('__all__')
        read_only_fields = ['id', 'slug', 'create_date']
