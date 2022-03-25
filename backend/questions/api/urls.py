from django.urls import path
from questions.api.views import GetQuestionTypesView, QuestionTypeView

urlpatterns = [
    path('question_type/', GetQuestionTypesView.as_view()),
    path('question_type/<int:pk>', QuestionTypeView.as_view()),
]
