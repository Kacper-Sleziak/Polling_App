# Generated by Django 3.2.7 on 2022-04-08 09:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0003_alter_poll_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='poll',
            name='description',
            field=models.TextField(blank=True, max_length=2000, null=True),
        ),
    ]