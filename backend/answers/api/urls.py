from django.urls import path
from answers.api.views import (AnswerView, AnswerDetailsView, CreateAnswerView,CreateAnswerDetailsView)

urlpatterns = [
    path('create_answers', CreateAnswerView.as_view()),
    path('create_answerdetails', CreateAnswerDetailsView.as_view()),
    path('answer/<int:pk>', AnswerView.as_view()),
    path('anwserdetails/<int:pk>', AnswerDetailsView.as_view())
]
