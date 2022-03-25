from questions.api.serializers import (Option, OptionSerializer, Question,
                                       QuestionSerializer,
                                       QuestionTypeSerializer)
from questions.models import Option, Question, QuestionType
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView


class GetQuestionTypesView(generics.ListAPIView):
    queryset = QuestionType.objects.all()
    serializer_class = QuestionTypeSerializer


class QuestionTypeView(APIView):
    serializer_class = QuestionTypeSerializer

    def get_question_type(self, pk):
        queryset = QuestionType.objects.filter(id=pk)

        if queryset.exists():
            question_type = queryset[0]
            return question_type
        else:
            return 0

    def get(self, request, pk, format=None):
        serializer = self.serializer_class
        question_type = self.get_question_type(pk)

        if question_type != 0:
            return Response(
                serializer(question_type).data,
                status=status.HTTP_200_OK
            )

        return Response(status=status.HTTP_204_NO_CONTENT)


class QuestionView(APIView):
    serializer_class = QuestionSerializer

    def get_question(self, pk):
        queryset = Question.objects.filter(id=pk)

        if queryset.exists():
            question = queryset[0]
            return question
        else:
            return 0

    def get(self, request, pk, format=None):
        serializer = self.serializer_class
        question = self.get_question(pk)

        if question != 0:
            return Response(
                serializer(question).data,
                status=status.HTTP_200_OK
            )

        return Response(status.HTTP_204_NO_CONTENT)


class OptionView(APIView):
    serializer_class = OptionSerializer

    def get_option(self, pk):
        queryset = Option.objects.filter(id=pk)

        if queryset.exists():
            option = queryset[0]
            return option
        else:
            return 0

    def get(self, request, pk, format=None):
        serializer = self.serializer_class
        option = self.get_option(pk)

        if option != 0:
            return Response(
                serializer(option).data,
                status=status.HTTP_200_OK
            )

        return Response(status.HTTP_204_NO_CONTENT)
