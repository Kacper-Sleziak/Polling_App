from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics

from account.api.serializers import (LoginSerializer, 
        AccountSerializer, CreateAccountSerializer, LogoSerializer)
from account.models import Account as AccountModel
from account.api.renderers import JPEGRenderer, PNGRenderer

# [POST] Login API View


class LoginView(generics.CreateAPIView):
    serializer_class = LoginSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            queryset = AccountModel.objects.all().filter(email=email)

            # Check if user with given email exists
            if queryset.exists():
                user = queryset[0]
                if user.check_password(password):
                    serializer = AccountSerializer(user)
                    return Response(serializer.data, status=status.HTTP_200_OK)
            return Response({'error': "Email or password is not correct!"}, 
                            status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# [GET] Get all accounts .


class AccountsView(generics.ListAPIView):
    queryset = AccountModel.objects.all()
    serializer_class = AccountSerializer


# [POST] View Creating Account by post request


class CreateAccountView(generics.CreateAPIView):
    serializer_class = CreateAccountSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            account = serializer.save()

            return Response(AccountSerializer(account).data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# [GET] Return logo of account

class GetLogoView(generics.RetrieveAPIView):

    renderer_classes = [JPEGRenderer, PNGRenderer]
        
    def get(self, request, *args, **kwargs):
        queryset = AccountModel.objects.filter(
            company_name=self.kwargs['company_name'])
        if queryset.exists():
            if queryset[0].logo:
                logo = queryset[0].logo
                print(logo)
                return Response(logo, content_type='image/jpg')
        return Response(status=status.HTTP_404_NOT_FOUND)

'''
This view add logo to account and delete old one if exists
'''

class UpdateLogo(APIView):
    serializer_class = LogoSerializer

    def put(self, request, *args, **kwargs):
        queryset = AccountModel.objects.filter(
            company_name=self.kwargs['company_name'])
        if queryset.exists():
            account = queryset[0]
            serializer = self.serializer_class(account, data=request.data)
            if serializer.is_valid():
                if account.logo:
                    account.logo.delete(save=False)
                serializer.save()   
                return Response(status=status.HTTP_200_OK)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_404_NOT_FOUND)