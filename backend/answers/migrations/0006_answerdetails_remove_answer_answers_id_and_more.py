# Generated by Django 4.0.3 on 2022-04-05 18:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('questions', '0001_initial'),
        ('answers', '0005_rename_answers_id_answer_answers_id_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='AnswerDetails',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text_answer', models.CharField(max_length=2000, verbose_name='text answer')),
            ],
        ),
        migrations.RemoveField(
            model_name='answer',
            name='answers_id',
        ),
        migrations.RemoveField(
            model_name='answer',
            name='option_id',
        ),
        migrations.RemoveField(
            model_name='answer',
            name='text_answer',
        ),
        migrations.AddField(
            model_name='answer',
            name='question_id',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='questions.question', verbose_name='question ID'),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='Answers',
        ),
        migrations.AddField(
            model_name='answerdetails',
            name='answers_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='answers.answer', verbose_name='answers ID'),
        ),
        migrations.AddField(
            model_name='answerdetails',
            name='option_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='questions.option', verbose_name='option ID'),
        ),
    ]
