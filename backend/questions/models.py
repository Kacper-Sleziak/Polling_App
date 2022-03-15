from django.db import models
from polls.models import Poll as PollModel


class QuestionType(models.Model):
    type_name = models.TextField(max_length=2000, default="New question type")


class Question(models.Model):
    content = models.TextField(default="Content", max_length=2000)
    poll_ID = models.ForeignKey(
        PollModel, on_delete=models.CASCADE, verbose_name="poll ID")
    question_ID = models.ForeignKey(
        QuestionType, on_delete=models.CASCADE, verbose_name="question ID")


class Option(models.Model):
    content = models.TextField(default="Option", max_length=2000)
    question_id = models.ForeignKey(
        Question, on_delete=models.CASCADE, verbose_name="question ID")
