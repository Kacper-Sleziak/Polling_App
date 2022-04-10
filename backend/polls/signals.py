import random
import string
from django.db import IntegrityError

from django.db.models.signals import pre_save
from django.dispatch import receiver

from polls.models import Poll


@receiver(pre_save, sender=Poll)
def slug_add(sender, instance, created=False, *args, **kwargs):
    if not instance.slug:
        while True:
            try:
                characters = string.ascii_letters + string.digits + '-' + '_'
                slug = ''.join(random.choice(characters) for i in range(50))
                instance.slug = slug
                break
            except IntegrityError as e:
                pass
