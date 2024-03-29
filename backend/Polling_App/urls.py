from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework.schemas import get_schema_view
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('account/', include('account.api.urls')),
    path('polls/', include('polls.api.urls')),
    path('questions/', include('questions.api.urls')),
    path('answers/', include('answers.api.urls')),
    path('triggers/', include('triggers.api.urls')),
    path('mail/', include('mail_sender.api.urls')),
    path('pdf/', include('pdf_results_exporter.api.urls')),
    path('openapi/', get_schema_view(), name='openapi-schema'),
    path('', TemplateView.as_view(
        template_name='swagger-ui.html',
        extra_context={'schema_url':'openapi-schema'}
    ), name='swagger-ui'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
