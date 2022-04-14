from django.db.models.signals import pre_delete, pre_save
from django.dispatch import receiver
from account.models import Account
from Polling_App.settings import BASE_DIR
import os

# Handling deleting unnecessary folders and images 
@receiver(pre_delete, sender=Account)
def delete_logo(sender, instance, *args, **kwargs):
    instance.logo.delete(save=False)
    




        