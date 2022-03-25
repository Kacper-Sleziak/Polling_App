from django.urls import path
from questions.api.views import (GetQuestionTypesView, OptionView,
                                 QuestionTypeView, QuestionView)

urlpatterns = [
    path('question_type/', GetQuestionTypesView.as_view()),
    path('question_type/<int:pk>', QuestionTypeView.as_view()),
    path('question/<int:pk>', QuestionView.as_view()),
    path('option/<int:pk>', OptionView.as_view()),
]
