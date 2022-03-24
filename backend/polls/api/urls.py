from django.urls import path
from polls.api.views import PollView, GetPollsView
from polls.api.views import PollView

urlpatterns = [
    path("", GetPollsView.as_view()),
    path("<int:pk>", PollView.as_view())
]
