from django.http import Http404
from questions.api.serializers import (OptionSerializer, QuestionSerializer,
                                       QuestionTypeSerializer)
from questions.models import Option, Question, QuestionType
from rest_framework import status, generics
from rest_framework.response import Response


class QuestionTypeList(generics.GenericAPIView):
    serializer_class = QuestionTypeSerializer
    
    def get(self, request, format=None):
        question_types = QuestionType.objects.all()
        serializer = self.serializer_class(question_types, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class QuestionTypeDetail(generics.GenericAPIView):
    serializer_class = QuestionTypeSerializer

    def get_object(self, pk):
        try:
            return QuestionType.objects.get(id=pk)
        except QuestionType.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        question_type = self.get_object(pk)
        serializer = self.serializer_class(question_type)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        question_type = self.get_object(pk)
        serializer = self.serializer_class(question_type, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        question_type = self.get_object(pk)
        question_type.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class QuestionDetail(generics.ListAPIView):
    serializer_class = QuestionSerializer

    def get_object(self, pk):
        try:
            return Question.objects.get(id=pk)
        except Question.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        question = self.get_object(pk)
        serializer = self.serializer_class(question)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        question = self.get_object(pk)
        serializer = self.serializer_class(question, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        question = self.get_object(pk)
        question.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class QuestionForPullList(generics.GenericAPIView):
    serializer_class = QuestionSerializer
    
    def get(self, request, poll_id, format=None):
        question = Question.objects.filter(poll=poll_id)
        if question.exists():
            serializer = self.serializer_class(question, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)

    def post(self, request, poll_id, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OptionDetail(generics.GenericAPIView):
    serializer_class = OptionSerializer

    def get_object(self, pk):
        try:
            return Option.objects.get(id=pk)
        except Option.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        option = self.get_object(pk)
        serializer = self.serializer_class(option)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        option = self.get_object(pk)
        serializer = self.serializer_class(option, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        option = self.get_object(pk)
        option.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class OptionForQuestionList(generics.GenericAPIView):
    serializer_class = OptionSerializer
    
    def get(self, request, question_id, format=None):
        option = Option.objects.filter(question=question_id)
        if option.exists():
            serializer = self.serializer_class(option, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)

    def post(self, request, question_id, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
