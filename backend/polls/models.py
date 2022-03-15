from django.db import models
from account import models as account_models

class Poll(models.Model):
    title = models.TextField(default="New poll", max_length=50)
    description = models.TextField(max_length=250, blank=True, null=True)
    is_active = models.BooleanField(default=False, verbose_name="is active")
    slug = models.TextField(max_length=50, null=True)
    start_date = models.DateTimeField(blank=True, null=True, verbose_name="start date")
    end_date = models.DateTimeField(blank=True, null=True, verbose_name="end date")
    create_date = models.DateTimeField(auto_now=True, verbose_name="create date")
    filling = models.IntegerField(default=0)
    sent = models.IntegerField(default=0)
    author_ID = models.ForeignKey(account_models.Account, on_delete=models.CASCADE, verbose_name="author ID")
    

    

    
