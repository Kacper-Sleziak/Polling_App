from django.urls import path
from polls.api.views import PollForAuthorList, PollDetail

urlpatterns = [
    path("<int:pk>/", PollDetail.as_view()),
    path("author/<int:author_id>/", PollForAuthorList.as_view()),
]
