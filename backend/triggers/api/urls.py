from django.urls import path
from triggers.api.views import CreateTriggerView

urlpatterns = [
    path('create', CreateTriggerView.as_view()),
]
