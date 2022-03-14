from django.db import models
from questions.models import Question

class Trigger(models.Model):
    triggering_answer = models.CharField(verbose_name="triggering answer", max_length=200)
    triggering_question = models.ForeignKey(Question, related_name ='%(class)s_triggering', on_delete=models.CASCADE)
    triggered_question = models.ForeignKey(Question, related_name ='%(class)s_triggered', on_delete=models.CASCADE)
