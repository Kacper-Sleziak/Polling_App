from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics

from triggers.models import Trigger
from questions.models import Question
from triggers.api.serializers import TriggerSerializer

# [POST] Creating Trigger


class CreateTriggerView(APIView):
    serializer_class = TriggerSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

# [GET, DELETE] Trigger View


class TriggerView(APIView):
    serializer_class = TriggerSerializer

    def get_trigger(self, pk):
        queryset = Trigger.objects.filter(id=pk)

        if queryset.exists():
            trigger = queryset[0]
            return trigger
        else:
            return 0

    def get(self, request, pk, format=None):
        serializer = self.serializer_class
        trigger = self.get_trigger(pk)

        if trigger != 0:
            return Response(
                serializer(trigger).data,
                status=status.HTTP_200_OK)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def delete(self, request, pk, format=None):
        trigger = self.get_trigger(pk)

        if trigger != 0:
            trigger.delete()
            trigger.save()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk, format=None):
        serializer = self.serializer_class(data=request.data)
        trigger = self.get_trigger(pk)

        if trigger != 0:
            if serializer.is_valid():
                serializer.update(trigger, serializer.validated_data)
                return Response(
                    self.serializer_class(trigger).data,
                    status.HTTP_200_OK)
            return Response(staus=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_204_NO_CONTENT)

# [GET] Get all triggers for given question view


class GetTriggersForQuestion(APIView):
    serializer_class = TriggerSerializer

    def get_question(self, pk):
        queryset = Question.objects.filter(id=pk)

        if queryset.exists():
            question = queryset[0]
            return question
        else:
            return 0

    def get(self, request, pk, format=None):
        serializer = self.serializer_class

        if self.get_question(pk) != 0:
            triggers = Trigger.objects.filter(triggered_question=pk)
            if triggers.exists():
                response_data = serializer(triggers, many=True).data
                return Response(response_data, status=status.HTTP_200_OK)
            return Response(
                {'triggers': 'no triggers for this question'}, status=status.HTTP_204_NO_CONTENT)
        return Response({'email': 'there is no email with given id'},
                        status=status.HTTP_204_NO_CONTENT)
