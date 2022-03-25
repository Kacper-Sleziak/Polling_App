from django.urls import path
from mail_sender.api.views import PostEmailAdressAndSendMail

urlpatterns = [
    path('', PostEmailAdressAndSendMail.as_view())
]
