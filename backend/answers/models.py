from django.db import models
from questions.models import Question as QuestionModel
from questions.models import Option as OptionModel


class Answer(models.Model):

    question_id = models.ForeignKey(
        QuestionModel, verbose_name="question_id", on_delete=models.CASCADE)

    def __str__(self):
        return self.question_ID


class AnswerDetails(models.Model):

    answers_id = models.ForeignKey(
        Answer, verbose_name="answer_id", on_delete=models.CASCADE)
    text_answer = models.CharField(verbose_name="text_answer", max_length=2000)
    option_id = models.ForeignKey(
        OptionModel, verbose_name="option_id", on_delete=models.CASCADE)

    def __str__(self):
        return self.text_answer
