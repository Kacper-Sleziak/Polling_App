# Generated by Django 3.2.12 on 2022-04-13 17:42

import account.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='logo',
            field=models.ImageField(blank=True, null=True, upload_to=account.models.logo_upload_location),
        ),
    ]
