from django.urls import path
from questions.api.views import (OptionDetail, OptionForQuestionList,
                                 QuestionDetail, QuestionForPullList,
                                 QuestionTypeDetail, QuestionTypeList)

urlpatterns = [
    path('question_type/', QuestionTypeList.as_view()),
    path('question_type/<int:pk>/', QuestionTypeDetail.as_view()),
    path('question/<int:pk>/', QuestionDetail.as_view()),
    path("question/poll/<int:poll_id>/", QuestionForPullList.as_view()),
    path('option/<int:pk>/', OptionDetail.as_view()),
    path('option/question/<int:question_id>/', OptionForQuestionList.as_view()),
]
