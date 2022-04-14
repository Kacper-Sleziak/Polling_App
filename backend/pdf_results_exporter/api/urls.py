from django import views
from django.urls import path
from pdf_results_exporter.api.views import GetPdfView

urlpatterns = [
    path('<int:pk>', GetPdfView.as_view())
]
