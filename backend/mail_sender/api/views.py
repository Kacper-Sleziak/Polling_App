from urllib import request
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mass_mail
from mail_sender.api.serializer import EmailSerializer

# [POST] 

class PostEmailAdressAndSendMail(APIView):

    def post(self, request):
        serializer = EmailSerializer(data=request.data)

        if serializer.is_valid():
            emails = serializer.data['emails']
            message = serializer.data['message']
            slug = serializer.data['slug']
                
            #send_mass_mail()
            
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)