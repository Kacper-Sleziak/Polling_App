from django.http import Http404

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from answers.api.serializers import (AnswerSerializer, AnswersSerializer)
from answers.models import Answer, Answers


# [POST] Creating Answer


class CreateAnswerView(APIView):
    serializer_class = AnswerSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


# [GET, DELETE] Answer View


class AnswerView(APIView):
    serializer_class = AnswerSerializer

    def get_answer(self, pk):
        queryset = Answer.objects.filter(id=pk)

        if queryset.exists():
            answer = queryset[0]
            return answer
        else:
            return 0

    def get(self, request, pk, format=None):
        serializer = self.serializer_class
        answer = self.get_answer(pk)

        if answer != 0:
            return Response(
                serializer(answer).data,
                status=status.HTTP_200_OK)

        return Response(status=status.HTTP_204_NO_CONTENT)

    def delete(self, request, pk, format=None):
        answer = self.get_answer(pk)

        if answer != 0:
            answer.delete()
            answer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk, format=None):
        serializer = self.serializer_class(data=request.data)
        answer = self.get_answer(pk)

        if answer != 0:
            if serializer.is_valid():
                serializer.update(answer, serializer.validated_data)
                return Response(
                    self.serializer_class(answer).data,
                    status.HTTP_200_OK)
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_204_NO_CONTENT)


# [POST] Creating Answers


class CreateAnswersView(APIView):
    serializer_class = AnswersSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


# [GET, DELETE] Answers View


class AnswersView(APIView):
    serializer_class = AnswersSerializer

    def get_answers(self, pk):
        queryset = Answers.objects.filter(id=pk)

        if queryset.exists():
            answers = queryset[0]
            return answers
        else:
            return 0

    def get(self, request, pk, format=None):
        serializer = self.serializer_class
        answers = self.get_answers(pk)

        if answers != 0:
            return Response(
                serializer(answers).data,
                status=status.HTTP_200_OK)

        return Response(status=status.HTTP_204_NO_CONTENT)

    def delete(self, request, pk, format=None):
        answers = self.get_answers(pk)

        if answers != 0:
            answers.delete()
            answers.save()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk, format=None):
        serializer = self.serializer_class(data=request.data)
        answers = self.get_answers(pk)

        if answers != 0:
            if serializer.is_valid():
                serializer.update(answers, serializer.validated_data)
                return Response(
                    self.serializer_class(answers).data,
                    status.HTTP_200_OK)
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_204_NO_CONTENT)