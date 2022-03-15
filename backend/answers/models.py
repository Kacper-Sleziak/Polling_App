from django.db import models
from questions.models import Question

class Answers(models.Model):
    question_ID = models.ForeignKey(Question,verbose_name="question ID", on_delete=models.CASCADE)

class Answer(models.Model):
    answers_ID = models.ForeignKey(Answers,related_name ='%(class)s_answer', verbose_name="answers ID", on_delete=models.CASCADE)
    text_answer = models.CharField(verbose_name="text answer", max_length=2000)
    option_ID = models.ForeignKey(Answers, verbose_name="option ID",related_name ='%(class)s_option', on_delete=models.CASCADE)
