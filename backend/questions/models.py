from django.db import models
from polls.models import Poll as PollModel


class QuestionType(models.Model):
    type_name = models.TextField(default="New question type")

    def __str__(self):
        return self.type_name


class Question(models.Model):
    position = models.IntegerField()
    content = models.CharField(default="Content", max_length=2000)
    poll = models.ForeignKey(
        PollModel, on_delete=models.CASCADE, verbose_name="poll ID", related_name='question')
    question_type = models.ForeignKey(
        QuestionType, on_delete=models.CASCADE, verbose_name="question_type")
    required = models.BooleanField(default=False)

    def __str__(self):
        if len(self.content) > 100:
            return f"{self.content[0:97]}..."
        else:
            return self.content[0:100]


class Option(models.Model):
    content = models.CharField(default="Option", max_length=2000)
    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, verbose_name="question ID",related_name='option')

    def __str__(self):
        if len(self.content) > 100:
            return f"{self.content[0:97]}..."
        else:
            return self.content[0:100]
