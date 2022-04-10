from django.urls import path
from polls.api.views import PollForAuthorList, PollDetail, CreatePoll

urlpatterns = [
    path("", CreatePoll.as_view()),
    path("<slug:slug>/", PollDetail.as_view()),
    path("author/<int:author_id>/", PollForAuthorList.as_view()),
]
