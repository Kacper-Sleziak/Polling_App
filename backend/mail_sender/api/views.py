from rest_framework.views import APIView
from rest_framework import status, generics
from rest_framework.response import Response
from django.core.mail import send_mail
from mail_sender.api.serializer import EmailSerializer

from Polling_App.settings import EMAIL_HOST_USER

# [POST] This view takes emails and send given message
# to these emails

class PostEmailAdressAndSendMail(generics.GenericAPIView):
    serializer_class = EmailSerializer
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():      
            emails = serializer.data['emails']
            message = serializer.data['message']
            subject = serializer.validated_data["subject"]
            slug = serializer.data['slug']
                   
            if message != None:
                message = message + f"\n Link do ankiety: Frontend/Ankiety/{slug}"
            else:
                message = f"\n Link do ankiety: Frontend/Ankiety/{slug}"
            
            # Host Email to configure           
            send_mail(
                subject,
                message,
                EMAIL_HOST_USER,
                emails,
            )
            
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)