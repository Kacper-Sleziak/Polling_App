from django.contrib import admin

from questions.models import Option, Question, QuestionType

admin.site.register(Question)
admin.site.register(QuestionType)
admin.site.register(Option)
