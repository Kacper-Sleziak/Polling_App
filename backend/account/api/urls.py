from django.urls import path
from account.api.views import (LoginView, AccountsView, 
    CreateAccountView, GetLogoView, UpdateLogo)

urlpatterns = [
    path('', AccountsView.as_view()),
    path('login', LoginView.as_view()),
    path('register', CreateAccountView.as_view()),
    path('logo/<company_name>', GetLogoView.as_view()),
    path('logo/update/<company_name>', UpdateLogo.as_view())

]
