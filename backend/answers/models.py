from django.db import models
from questions.models import Question
from questions.models import Option


class Answer(models.Model):

    question_id = models.ForeignKey(
        Question, verbose_name="question id", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.question_id}"


class AnswerDetails(models.Model):

    answers_id = models.ForeignKey(
        Answer, verbose_name="answer id", on_delete=models.CASCADE,related_name='answerdetails')
    text_answer = models.CharField(verbose_name="text_answer", max_length=2000)
    option_id = models.ForeignKey(
        Option, verbose_name="option id", on_delete=models.CASCADE)

    def __str__(self):
        return self.text_answer
