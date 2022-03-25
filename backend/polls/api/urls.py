from django.urls import path
from polls.api.views import GetPollsView, PollView

urlpatterns = [
    path("", GetPollsView.as_view()),
    path("<int:pk>", PollView.as_view())
]
