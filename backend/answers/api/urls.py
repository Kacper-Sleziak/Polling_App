from django.urls import path
from answers.api.views import (
    AnswerView, AnswerDetailsView, CreateAnswerView, CreateAnswerDetailsView, GetAnswerByQuestion,GetAnswerDetailsByAnswer)

urlpatterns = [
    path('create_answers', CreateAnswerView.as_view()),
    path('create_answerdetails', CreateAnswerDetailsView.as_view()),
    path('answer/<int:pk>', AnswerView.as_view()),
    path('answer/question/<int:pk>',GetAnswerByQuestion.as_view()),
    path('anwserdetails/<int:pk>', AnswerDetailsView.as_view()),
    path('answerdetails/answer/<int:pk>',GetAnswerDetailsByAnswer.as_view())
]
