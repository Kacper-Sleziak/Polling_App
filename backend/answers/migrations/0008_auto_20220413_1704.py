# Generated by Django 3.2.12 on 2022-04-13 15:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('questions', '0002_question_position'),
        ('answers', '0007_alter_answerdetails_answers_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='question_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='questions.question', verbose_name='question_id'),
        ),
        migrations.AlterField(
            model_name='answerdetails',
            name='answers_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='answers.answer', verbose_name='answer_id'),
        ),
        migrations.AlterField(
            model_name='answerdetails',
            name='option_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='questions.option', verbose_name='option_id'),
        ),
        migrations.AlterField(
            model_name='answerdetails',
            name='text_answer',
            field=models.CharField(max_length=2000, verbose_name='text_answer'),
        ),
    ]
