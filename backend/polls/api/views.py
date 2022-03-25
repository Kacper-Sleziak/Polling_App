from django.http import Http404
from polls.api.serializers import PollSerializer
from polls.models import Poll
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

class PollForAuthorList(APIView):

    def get(self, request, author_id, format=None):
        poll = Poll.objects.filter(author=author_id)
        if poll.exists():
            serializer = PollSerializer(poll, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)

    def post(self, request, author_id, format=None):
        serializer = PollSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


class PollDetail(APIView):

    def get_object(self, pk):
        try:
            return Poll.objects.get(id=pk)
        except Poll.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        poll = self.get_object(pk)
        serializer = PollSerializer(poll)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        poll = self.get_object(pk)
        serializer = PollSerializer(poll, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        poll = self.get_object(pk)
        poll.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
