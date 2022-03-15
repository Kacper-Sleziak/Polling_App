from django.db import models
from questions import models as questions_models

class Answers(models.Model):
    question_ID = models.ForeignKey(questions_models.Question, verbose_name="question ID", on_delete=models.CASCADE)

class Answer(models.Model):
    answers_ID = models.ForeignKey(Answers, verbose_name="answers ID", on_delete=models.CASCADE)
    text_answer = models.CharField(verbose_name="text answer", max_length=2000)
    option_ID = models.ForeignKey(questions_models.Option, verbose_name="option ID", on_delete=models.CASCADE)
