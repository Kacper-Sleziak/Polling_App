from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics

from polls.models import Poll
from polls.api.serializers import PollSerializer


class GetPollsView(generics.ListAPIView):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer


class PollView(APIView):
    serializer_class = PollSerializer

    def get_poll(self, pk):
        queryset = Poll.objects.filter(id=pk)

        if queryset.exists():
            poll = queryset[0]
            return poll
        else:
            return 0

    def get(self, request, pk, format=None):
        serializer = self.serializer_class
        poll = self.get_poll(pk)

        if poll != 0:
            return Response(
                serializer(poll).data,
                status=status.HTTP_200_OK
            )

        return Response(status=status.HTTP_204_NO_CONTENT)
