from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('account/', include('account.api.urls')),
    path('polls/', include('polls.api.urls')),
    path('questions/', include('questions.api.urls')),
    path('answers/', include('questions.api.urls')),
    path('triggers/', include('questions.api.urls')),
]
