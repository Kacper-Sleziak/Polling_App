import random
import string

from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.utils.text import slugify

from polls.models import Poll


@receiver(pre_save, sender=Poll)
def slug_add(sender, instance, created=False, *args, **kwargs):
    if not instance.slug:
        characters = string.ascii_letters + string.digits + '-' + '_'
        slug = ''.join(random.choice(characters) for i in range(50))

        instance.slug = slug
