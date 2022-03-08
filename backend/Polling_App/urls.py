from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('account/', include('Account.API.urls')),
    path('polls/', include('Polls.API.urls')),
]
