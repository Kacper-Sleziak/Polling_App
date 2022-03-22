from rest_framework.serializers import ModelSerializer
from django.core.validators import EmailValidator
from account.models import Account


class LoginSerializer(ModelSerializer):
    class Meta:
        model = Account
        fields = ('email', 'password')
        extra_kwargs = {
            'email': {'validators': [EmailValidator, ]},
        }


class AccountSerializer(ModelSerializer):
    class Meta:
        model = Account
        fields = ('email', 'company_name', 'date_joined', 'last_login', 'is_admin',
                  'is_active', 'is_staff', 'is_superuser')
