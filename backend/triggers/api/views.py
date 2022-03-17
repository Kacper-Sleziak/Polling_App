from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics

from triggers.models import Trigger
from triggers.api.serializers import TriggerSerializer

# [POST] Creating Trigger 
class CreateTriggerView(APIView):
    serializer_class = TriggerSerializer
    
    def are_questions_from_same_poll(self, triggering_question, triggered_question):
        if triggering_question.poll == triggered_question.poll:
            return True
        return False
    
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            triggering_question = serializer.validated_data['triggering_question']
            triggered_question = serializer.validated_data['triggered_question']
            if self.are_questions_from_same_poll(triggering_question, triggered_question):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response({'error': "Questions come from different polls!"}, 
                            status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_400_BAD_REQUEST)
        
        
        

