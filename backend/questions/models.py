from django.db import models
from polls.models import Poll as PollModel


class QuestionType(models.Model):
    type_name = models.TextField(default="New question type")


class Question(models.Model):
    content = models.CharField(default="Content", max_length=2000)
    poll = models.ForeignKey(
        PollModel, on_delete=models.CASCADE, verbose_name="poll ID")
    question_type = models.ForeignKey(
        QuestionType, on_delete=models.CASCADE, verbose_name="question ID")


class Option(models.Model):
    content = models.CharField(default="Option", max_length=2000)
    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, verbose_name="question ID")
