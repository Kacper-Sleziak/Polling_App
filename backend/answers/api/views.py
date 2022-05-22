from django.http import Http404
from django.db import models

from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView


from answers.api.serializers import (AnswerSerializer, AnswerDetailsSerializer)
from answers.models import Answer, AnswerDetails
from questions.models import Question
from polls.models import Poll as PollModel

class QuestionType(models.Model):
    type_name = models.TextField(default="New question type")

    def __str__(self):
        return self.type_name


class Question(models.Model):
    position = models.IntegerField()
    content = models.CharField(default="Content", max_length=2000)
    poll = models.ForeignKey(
        PollModel, on_delete=models.CASCADE, verbose_name="poll ID")
    question_type = models.ForeignKey(
        QuestionType, on_delete=models.CASCADE, verbose_name="question_type")

    def __str__(self):
        if len(self.content) > 100:
            return f"{self.content[0:97]}..."
        else:
            return self.content[0:100]


# [POST] Creating AnswerDetails
class CreateAnswerDetailsView(generics.GenericAPIView):
    serializer_class = AnswerDetailsSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


# [GET, DELETE] AnswerDetails View
class AnswerDetailsView(generics.GenericAPIView):
    serializer_class = AnswerDetailsSerializer

    def get_answer_details_by_id(self, pk):
        queryset = AnswerDetails.objects.filter(id=pk)

        if queryset.exists():
            answer_details = queryset
            return answer_details
        else:
            return 0

    def get(self, request, pk, format=None):
        serializer = self.serializer_class
        answer_details = self.get_answer_details_by_id(pk)

        if self.get_answer_details_by_id(pk) != 0:
            response_data = serializer(answer_details, many=True).data
            return Response(response_data, status=status.HTTP_200_OK)
        return Response({'AnswerDetails': 'there is no AnswerDetails with given id'},
                        status=status.HTTP_204_NO_CONTENT)

    def delete(self, request, pk, format=None):
        answer_details = self.get_answer_details_by_id(pk)[0]

        if answer_details != 0:
            answer_details.delete()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk, format=None):
        serializer = self.serializer_class(data=request.data)
        answer_details = self.get_answer_details_by_id(pk)[0]

        if answer_details != 0:
            if serializer.is_valid():
                serializer.update(answer_details, serializer.validated_data)
                return Response(
                    self.serializer_class(answer_details).data,
                    status.HTTP_200_OK)
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_204_NO_CONTENT)

# [GET] Getting AnswerDetails By Answer ID
class GetAnswerDetailsByAnswer(generics.GenericAPIView):
    serializer_class = AnswerDetailsSerializer

    def get_answerdetails_by_answer(self, pk):
        queryset = AnswerDetails.objects.filter(answers_id=pk)

        if queryset.exists():
            answer = queryset
            return answer
        else:
            return 0

    def get(self, request, pk, format=None):
        serializer = self.serializer_class
        answer = self.get_answerdetails_by_answer(pk)

        if self.get_answerdetails_by_answer(pk) != 0:
            response_data = serializer(answer, many=True).data
            return Response(response_data, status=status.HTTP_200_OK)
        return Response({'AnswerDetails': 'there is no answerdetails with given answer id'},
                        status=status.HTTP_204_NO_CONTENT)

# [POST] Creating Answer
class CreateAnswerView(generics.CreateAPIView):
    serializer_class = AnswerSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


# [GET] Getting Answer By Question ID
class GetAnswerByQuestion(generics.GenericAPIView):
    serializer_class = AnswerSerializer

    def get_answer_by_question(self, pk):
        queryset = Answer.objects.filter(question_id=pk)

        if queryset.exists():
            answer = queryset
            return answer
        else:
            return 0

    def get(self, request, pk, format=None):
        serializer = self.serializer_class
        answer = self.get_answer_by_question(pk)

        if self.get_answer_by_question(pk) != 0:
            response_data = serializer(answer, many=True).data
            return Response(response_data, status=status.HTTP_200_OK)
        return Response({'Answer': 'there is no answers with given question id'},
                        status=status.HTTP_204_NO_CONTENT)


# [GET, DELETE] Answer View
class AnswerView(generics.GenericAPIView):
    serializer_class = AnswerSerializer

    def get_answer_by_id(self, pk):
        queryset = Answer.objects.filter(id=pk)

        if queryset.exists():
            answer = queryset
            return answer
        else:
            return 0

    def get(self, request, pk, format=None):
        serializer = self.serializer_class
        answer = self.get_answer_by_id(pk)

        if self.get_answer_by_id(pk) != 0:
            response_data = serializer(answer, many=True).data
            return Response(response_data, status=status.HTTP_200_OK)
        return Response({'Answer': 'there is no asnwers with given id'},
                        status=status.HTTP_204_NO_CONTENT)

    def delete(self, request, pk, format=None):
        answer = self.get_answer_by_id(pk)[0]

        if answer != 0:
            answer.delete()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk, format=None):
        serializer = self.serializer_class(data=request.data)
        answers = self.get_answer_by_id(pk)[0]

        if answers != 0:
            if serializer.is_valid():
                serializer.update(answers, serializer.validated_data)
                return Response(
                    self.serializer_class(answers).data,
                    status.HTTP_200_OK)
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_204_NO_CONTENT)


        # [GET] Getting All Answers from Pool with given slug
class GetAnswersByPool(generics.GenericAPIView):
    serializer_class = AnswerSerializer

    def get_answers_by_pool(self, pk):
        queryset = Answer.objects.filter(question__pool__id=pk)

        if queryset.exists():
            answer = queryset
            return answer
        else:
            return 0

    def get(self, request, pk, format=None):
        serializer = self.serializer_class
        answer = self.get_answers_by_pool(pk)

        if self.get_answers_by_pool(pk) != 0:
            response_data = serializer(answer, many=True).data
            return Response(response_data, status=status.HTTP_200_OK)
        return Response({'Answer': 'there is no answers with given pool id'},
                        status=status.HTTP_204_NO_CONTENT)