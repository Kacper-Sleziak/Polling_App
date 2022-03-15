from django.urls import path
from account.api.views import Login

urlpatterns = [
    path('login', Login.as_view()),
]
