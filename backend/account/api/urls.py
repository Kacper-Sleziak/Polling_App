from django.urls import path
from account.api.views import LoginView, AccountsView

urlpatterns = [
    path('', AccountsView.as_view()),
    path('login', LoginView.as_view()),
]
