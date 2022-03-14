from django.contrib import admin
from questions.models import Question, QuestionType, Option

admin.site.register(Question)
admin.site.register(QuestionType)
admin.site.register(Option)

