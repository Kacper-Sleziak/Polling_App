from django.urls import path
from triggers.api.views import CreateTriggerView
from triggers.api.views import TriggerView

urlpatterns = [
    path('create', CreateTriggerView.as_view()),
    path('<int:pk>', TriggerView.as_view())
]
