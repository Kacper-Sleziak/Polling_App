from django.urls import path
from answers.api.views import (AnswerView, AnswersView, CreateAnswerView,CreateAnswersView)

urlpatterns = [
    path('create_answer', CreateAnswerView.as_view()),
    path('create_answers', CreateAnswersView.as_view()),
    path('<int:pk>', AnswerView.as_view()),
    path('<int:pk>', AnswersView.as_view())
]
