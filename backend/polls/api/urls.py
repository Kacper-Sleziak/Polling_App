from django.urls import path
from polls.api.views import PollForAuthorList, PollDetail, CreatePoll, DuplicatePoll

urlpatterns = [
    path("", CreatePoll.as_view()),
    path("<slug:slug>/", PollDetail.as_view()),
    path("author/<int:author_id>/", PollForAuthorList.as_view()),
    path("duplicate/<slug:slug>/", DuplicatePoll.as_view()),
]
