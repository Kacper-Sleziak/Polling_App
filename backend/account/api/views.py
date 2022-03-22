from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics

from account.api.serializers import LoginSerializer, AccountSerializer, CreateAccountSerializer
from account.models import Account as AccountModel

# [POST] Login API View


class LoginView(APIView):
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
            return Response({'error': "Email or password is not correct!"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# [GET] Get all accounts .


class AccountsView(generics.ListAPIView):
    queryset = AccountModel.objects.all()
    serializer_class = AccountSerializer


# [POST] View Creating Account by post request


class CreateAccountView(APIView):
    serializer_class = CreateAccountSerializer
    
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            account = serializer.save()

            return Response(AccountSerializer(account).data , status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
