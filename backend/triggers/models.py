from django.db import models
from questions.models import Question
from django.core.exceptions import ValidationError


class Trigger(models.Model):
    triggering_answer = models.CharField(
        verbose_name="triggering answer", max_length=200)
    triggering_question = models.ForeignKey(
        Question, related_name='%(class)s_triggering', on_delete=models.CASCADE)
    triggered_question = models.ForeignKey(
        Question, related_name='%(class)s_triggered', on_delete=models.CASCADE)

    def clean(self):

        # Checking if 2 questions belong to same poll
        if self.triggering_question.poll != self.triggered_question.poll:
            raise ValidationError(
                {'triggering_question': 'Triggers must be related with same poll!'})

        # Checking if 2 questions are triggering each other
        # For example question1 is triggering question2 and question2 is triggering question2
        queryset = Trigger.objects.filter(
            triggering_question=self.triggered_question)
        if queryset.exists():
            raise ValidationError(
                {'triggering_question': 'Two questions can not trigger each other!'})

    def save(self, *args, **kwargs):
        self.full_clean()
        return super().save(*args, **kwargs)
