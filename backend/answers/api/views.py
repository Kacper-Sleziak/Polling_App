from collections import namedtuple

from multiprocessing import pool
from django.forms import SlugField
from django.http import Http404
from django.db import models

from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView


from answers.api.serializers import (
    AnswerSerializer, AnswerDetailsSerializer)

from questions.models import Question
from polls.api.serializers import (PollRelatedSerializer)
from answers.models import Answer, AnswerDetails
from polls.models import Poll

import logging

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

# [GET] Getting All Answers from Pool with given id


class GetAnswersByPoll_ID(generics.GenericAPIView):
    serializer_class = PollRelatedSerializer

    def get_poll_by_id(self, pk):
        queryset = Poll.objects.filter(id=pk)

        if queryset.exists():
            poll_queryset = queryset
            return poll_queryset
        else:
            return 0

    def get(self, request, pk, format=None):    
        poll_obj = self.get_poll_by_id(pk)
        poll_serializer = PollRelatedSerializer(instance=poll_obj, many=True)

        if self.get_poll_by_id(pk) != 0:
            ResultModel = poll_serializer.data
            return Response(ResultModel, status=status.HTTP_200_OK)
        return Response({'Answer': 'there is no answers with given pool id'},
                        status=status.HTTP_204_NO_CONTENT)

# [GET] Getting All Answers from Pool with given id


class GetAnswersByPoll_Slug(generics.GenericAPIView):
    serializer_class = PollRelatedSerializer

    def get_poll_by_slug(self, slug):
        queryset = Poll.objects.filter(slug=slug)

        if queryset.exists():
            poll_queryset = queryset
            return poll_queryset
        else:
            return 0

    def get(self, request, slug, format=None):


        poll_obj = self.get_poll_by_slug(slug)
        poll_serializer = PollRelatedSerializer(instance=poll_obj, many=True)

        if self.get_poll_by_slug(slug) != 0:
            ResultModel = poll_serializer.data
            return Response(ResultModel, status=status.HTTP_200_OK)
        return Response({'Answer': 'there is no answers with given pool slug'},
                        status=status.HTTP_204_NO_CONTENT)
