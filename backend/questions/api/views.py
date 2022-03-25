from django.http import Http404
from questions.api.serializers import (OptionSerializer, QuestionSerializer,
                                       QuestionTypeSerializer)
from questions.models import Option, Question, QuestionType
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class QuestionTypeList(APIView):

    def get(self, request, format=None):
        question_types = QuestionType.objects.all()
        serializer = QuestionTypeSerializer(question_types, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = QuestionTypeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class QuestionTypeDetail(APIView):

    def get_object(self, pk):
        try:
            return QuestionType.objects.get(id=pk)
        except QuestionType.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        question_type = self.get_object(pk)
        serializer = QuestionTypeSerializer(question_type)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        question_type = self.get_object(pk)
        serializer = QuestionTypeSerializer(question_type, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        question_type = self.get_object(pk)
        question_type.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class QuestionDetail(APIView):

    def get_object(self, pk):
        try:
            return Question.objects.get(id=pk)
        except Question.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        question = self.get_object(pk)
        serializer = QuestionSerializer(question)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        question = self.get_object(pk)
        serializer = QuestionSerializer(question, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        question = self.get_object(pk)
        question.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class QuestionForPullList(APIView):
    
    def get(self, request, poll_id, format=None):
        question = Question.objects.filter(poll=poll_id)
        if question.exists():
            serializer = QuestionSerializer(question, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)

    def post(self, request, poll_id, format=None):
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OptionDetail(APIView):

    def get_object(self, pk):
        try:
            return Option.objects.get(id=pk)
        except Option.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        option = self.get_object(pk)
        serializer = OptionSerializer(option)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        option = self.get_object(pk)
        serializer = OptionSerializer(option, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        option = self.get_object(pk)
        option.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class OptionForQuestionList(APIView):
    
    def get(self, request, question_id, format=None):
        option = Option.objects.filter(question=question_id)
        if option.exists():
            serializer = OptionSerializer(option, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)

    def post(self, request, question_id, format=None):
        serializer = OptionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
