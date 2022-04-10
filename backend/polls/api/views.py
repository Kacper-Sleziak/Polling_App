from django.http import Http404
from polls.api.serializers import PollSerializer
from polls.models import Poll
from rest_framework import status, generics
from rest_framework.response import Response


class PollForAuthorList(generics.ListAPIView):
    serializer_class = PollSerializer

    def get(self, request, author_id, format=None):
        """
        TEST.
        """
        poll = Poll.objects.filter(author=author_id)
        if poll.exists():
            serializer = self.serializer_class(poll, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)


class PollDetail(generics.ListAPIView):
    serializer_class = PollSerializer

    def get_object(self, slug):
        try:
            return Poll.objects.get(slug=slug)
        except Poll.DoesNotExist:
            raise Http404

    def get(self, request, slug, format=None):
        poll = self.get_object(slug)
        serializer = self.serializer_class(poll)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, slug, format=None):
        poll = self.get_object(slug)
        serializer = self.serializer_class(poll, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, slug, format=None):
        poll = self.get_object(slug)
        poll.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
