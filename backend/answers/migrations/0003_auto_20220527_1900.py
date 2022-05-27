# Generated by Django 3.2.12 on 2022-05-27 17:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('questions', '0004_auto_20220527_1845'),
        ('answers', '0002_auto_20220527_1845'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answerdetails',
            name='option_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='questions.option', verbose_name='option id'),
        ),
        migrations.AlterField(
            model_name='answerdetails',
            name='text_answer',
            field=models.CharField(blank=True, max_length=2000, null=True, verbose_name='text_answer'),
        ),
    ]
