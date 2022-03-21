from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('account/', include('account.api.urls')),
    path('polls/', include('polls.api.urls')),
    path('questions/', include('questions.api.urls')),
    path('answers/', include('answers.api.urls')),
    path('triggers/', include('triggers.api.urls')),
    path('results/', include('results_exporter.api.urls')),
    path('mail/', include('mail_sender.api.urls')),
]
