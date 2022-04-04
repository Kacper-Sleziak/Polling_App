from django.http import Http404
from polls.api.serializers import PollSerializer
from polls.models import Poll
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class PollForAuthorList(APIView):

    def get(self, request, author_id, format=None):
        poll = Poll.objects.filter(author=author_id)
        if poll.exists():
            serializer_class = PollSerializer(poll, many=True)
            return Response(serializer_class.data)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)


class PollDetail(APIView):

    def get_object(self, slug):
        try:
            return Poll.objects.get(slug=slug)
        except Poll.DoesNotExist:
            raise Http404

    def get(self, request, slug, format=None):
        poll = self.get_object(slug)
        serializer_class = PollSerializer(poll)
        return Response(serializer_class.data)

    def post(self, request, format=None):
        serializer_class = PollSerializer(data=request.data)
        if serializer_class.is_valid():
            serializer_class.save()
            return Response(serializer_class.data, status=status.HTTP_201_CREATED)
        return Response(serializer_class.data, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, slug, format=None):
        poll = self.get_object(slug)
        serializer_class = PollSerializer(poll, data=request.data)
        if serializer_class.is_valid():
            serializer_class.save()
            return Response(serializer_class.data)
        return Response(serializer_class.error, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, slug, format=None):
        poll = self.get_object(slug)
        poll.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
