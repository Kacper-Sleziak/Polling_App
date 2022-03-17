from django.urls import path
from triggers.api.views import CreateTriggerView, TriggerView, GetTriggersForQuestion

urlpatterns = [
    path('create', CreateTriggerView.as_view()),
    path('<int:pk>', TriggerView.as_view()),
    path('question/<int:pk>', GetTriggersForQuestion.as_view())
]
