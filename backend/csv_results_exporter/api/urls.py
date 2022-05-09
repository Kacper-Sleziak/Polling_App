from django import views
from django.urls import path
from csv_results_exporter.api.views import GetCSVView

urlpatterns = [
    path('<int:pk>', GetCSVView.as_view())
]
