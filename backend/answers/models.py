from django.db import models
from questions.models import Question as QuestionModel
from questions.models import Option as OptionModel

class Answers(models.Model):
    question = models.ForeignKey(QuestionModel, verbose_name="question ID", on_delete=models.CASCADE)

class Answer(models.Model):
    answers = models.ForeignKey(Answers, verbose_name="answers ID", on_delete=models.CASCADE)
    text_answer = models.CharField(verbose_name="text answer", max_length=2000)
    option = models.ForeignKey(OptionModel, verbose_name="option ID", on_delete=models.CASCADE)
