import random
import string

from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.utils.text import slugify

from polls.models import Poll


@receiver(pre_save, sender=Poll)
def slug_add(sender, instance, created=False, *args, **kwargs):
    if created:
        characters = string.ascii_letters + string.digits + string.punctuation
        slug = ''.join(random.choice(characters) for i in range(30))

        instance.slug = slug
