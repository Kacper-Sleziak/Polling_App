# Generated by Django 3.2.12 on 2022-05-27 16:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('questions', '0003_alter_question_question_type'),
        ('answers', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='question_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='answer', to='questions.question', verbose_name='question id'),
        ),
        migrations.AlterField(
            model_name='answerdetails',
            name='answers_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='answerdetails', to='answers.answer', verbose_name='answer id'),
        ),
        migrations.AlterField(
            model_name='answerdetails',
            name='option_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='questions.option', verbose_name='option id'),
        ),
    ]
