from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics

from questions.models import QuestionType, Question, Option
from questions.api.serializers import QuestionTypeSerializer, Question, Option

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