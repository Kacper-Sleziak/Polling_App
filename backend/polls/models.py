from account.models import Account as AccountModel
from django.db import models


class Poll(models.Model):
    ACTIVE = 0
    FINISHED = 1
    DRAFT = 2
    STATUS_CHOICES = [
        (ACTIVE, 'Active'),
        (FINISHED, 'Finished'),
        (DRAFT, 'Draft')
    ]

    title = models.TextField(default="New poll", max_length=50)
    description = models.TextField(max_length=2000, blank=True, null=True)
    slug = models.SlugField(max_length=50, editable=False, unique=True)
    start_date = models.DateTimeField(
        blank=True, null=True, verbose_name="start date")
    end_date = models.DateTimeField(
        blank=True, null=True, verbose_name="end date")
    create_date = models.DateTimeField(
        auto_now_add=True, verbose_name="create date")
    filling = models.IntegerField(default=0)
    sent = models.IntegerField(default=0)
    status = models.IntegerField(
        choices=STATUS_CHOICES,
        default=ACTIVE,
    )
    author = models.ForeignKey(
        AccountModel, on_delete=models.CASCADE, verbose_name="author ID")

    def __str__(self):
        return self.title
