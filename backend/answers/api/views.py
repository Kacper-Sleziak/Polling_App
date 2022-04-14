from django.http import Http404

from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView


from answers.api.serializers import (AnswerSerializer, AnswerDetailsSerializer)
from answers.models import Answer, AnswerDetails


# [POST] Creating AnswerDetails
class CreateAnswerDetailsView(generics.ListAPIView):
    serializer_class = AnswerDetailsSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


# [GET, DELETE] AnswerDetails View
class AnswerDetailsView(generics.ListAPIView):
    serializer_class = AnswerSerializer

    def get_answer_details_by_id(self, pk):
        queryset = AnswerDetails.objects.filter(id=pk)

        if queryset.exists():
            answer_details = queryset[0]
            return answer_details
        else:
            return 0

    def get(self, request, pk, format=None):
        serializer = self.serializer_class
        answer_details = self.get_answer_details_by_id(pk)

        if self.get_answer(pk) != 0:
            response_data = serializer(answer_details, many=True).data
            return Response(response_data, status=status.HTTP_200_OK)
        return Response({'AnswerDetails': 'there is no AnswerDetails with given id'},
                        status=status.HTTP_204_NO_CONTENT)

    def delete(self, request, pk, format=None):
        answer_details = self.get_answer_details_by_id(pk)

        if answer_details != 0:
            answer_details.delete()
            answer_details.save()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk, format=None):
        serializer = self.serializer_class(data=request.data)
        answer_details = self.get_answer_details_by_id(pk)

        if answer_details != 0:
            if serializer.is_valid():
                serializer.update(answer_details, serializer.validated_data)
                return Response(
                    self.serializer_class(answer_details).data,
                    status.HTTP_200_OK)
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_204_NO_CONTENT)

# [GET] Getting AnswerDetails By Question ID
class GetAnswerDetailsByQuestion(generics.ListAPIView):
    serializer_class = AnswerDetailsSerializer

    def get_answerdetails_by_question(self, pk):
        queryset = AnswerDetails.objects.filter(question_id=pk)

        if queryset.exists():
            answer = queryset[0]
            return answer
        else:
            return 0

    def get(self, request, pk, format=None):
        serializer = self.serializer_class
        answer = self.get_answerdetails_by_question(pk)

        if self.get_answerdetails_by_question(pk) != 0:
            response_data = serializer(answer, many=True).data
            return Response(response_data, status=status.HTTP_200_OK)
        return Response({'AnswerDetails': 'there is no answerdetails with given question id'},
                        status=status.HTTP_204_NO_CONTENT)

# [POST] Creating Answer
class CreateAnswerView(generics.ListAPIView):
    serializer_class = AnswerSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


# [GET] Getting Answer By Question ID
class GetAnswerByQuestion(generics.ListAPIView):
    serializer_class = AnswerSerializer

    def get_answer_by_question(self, pk):
        queryset = Answer.objects.filter(question_id=pk)

        if queryset.exists():
            answer = queryset[0]
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
class AnswerView(generics.ListAPIView):
    serializer_class = AnswerSerializer

    def get_answer_by_id(self, pk):
        queryset = Answer.objects.filter(id=pk)

        if queryset.exists():
            answer = queryset[0]
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
        answer = self.get_answer_by_id(pk)

        if answer != 0:
            answer.delete()
            answer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk, format=None):
        serializer = self.serializer_class(data=request.data)
        answers = self.get_answer_by_id(pk)

        if answers != 0:
            if serializer.is_valid():
                serializer.update(answers, serializer.validated_data)
                return Response(
                    self.serializer_class(answers).data,
                    status.HTTP_200_OK)
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_204_NO_CONTENT)
