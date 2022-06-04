import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { defaultIfEmpty, forkJoin, map, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Answer } from '../../models/form-models/answer';
import { Question, QuestionType } from '../../models/form-models/question';
import { AnswerService } from './answer.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  questions: Question[] = [];
  questionNewId: number = 0;
  answerNewId: number = 0;

  constructor(private http: HttpClient, private answerService: AnswerService) {}

  getQuestions(id: number): Observable<Question[]> {
    return this.http
      .get(`${environment.apiUrl}/questions/question/poll/${id}/`)
      .pipe(
        map((result: any) => {
          const questions: Question[] = [];

          if (result !== null) {
            for (const question of result) {
              questions.push(
                new Question(
                  question.id,
                  question.content,
                  [],
                  QuestionTypeFactory.getType(question.question_type),
                  question.position
                )
              );
            }
          }
          return questions;
        })
      );
  }

  postQuestion(question: Question, pollId: number): Observable<Question> {
    return this.http.post<Question>(
      `${environment.apiUrl}/questions/question/create/`,
      {
        position: question.position,
        content: question.question,
        poll: pollId,
        question_type: QuestionTypeFactory.getTypeId(question.type),
      }
    );
  }

  putQuestion(question: Question, pollId: number): Observable<Question> {
    return this.http.put<Question>(
      `${environment.apiUrl}/questions/question/${question.id}/`,
      {
        position: question.position,
        content: question.question,
        poll: pollId,
        question_type: QuestionTypeFactory.getTypeId(question.type),
      }
    );
  }

  saveQuestions(questions: Question[], pollId: number): Observable<Question[]> {
    const obs: Observable<Question>[] = [];

    for (const question of questions) {
      obs.push(
        new Observable<Question>((subscription) => {
          if (question.id === -1) {
            this.postQuestion(question, pollId).subscribe((q) =>
              this.answerService
                .saveAnswers(question.answers, q.id)
                .pipe(defaultIfEmpty([]))
                .subscribe((r: Answer[]) => {
                  q.answers = r;
                  subscription.next(q);
                  subscription.complete();
                })
            );
          } else {
            this.putQuestion(question, pollId).subscribe((q) =>
              this.answerService
                .saveAnswers(question.answers, q.id)
                .pipe(defaultIfEmpty([]))
                .subscribe((r: Answer[]) => {
                  q.answers = r;
                  subscription.next(q);
                  subscription.complete();
                })
            );
          }
        })
      );
    }
    return forkJoin(obs);
  }

  removeQuestions(questionsToRemove: number[]): Observable<any[]> {
    const obs: Observable<any>[] = [];
    for (const questionId of questionsToRemove) {
      obs.push(
        this.http.delete(
          `${environment.apiUrl}/questions/question/${questionId}/`
        )
      );
    }
    return forkJoin(obs);
  }
}

const QuestionTypeFactory = {
  getType: (typeId: number): QuestionType => {
    console.log(typeId);
    switch (typeId) {
      case 1:
        return QuestionType.Checkbox;
      case 2:
        return QuestionType.Combobox;
      case 3:
        return QuestionType.LongText;
      case 4:
        return QuestionType.ShortText;
      case 5:
        return QuestionType.Radio;
      case 6:
        return QuestionType.Scale5;
      case 7:
        return QuestionType.Scale10;
    }
    return QuestionType.Checkbox;
  },
  getTypeId: (type: QuestionType): number => {
    switch (type) {
      case QuestionType.Checkbox:
        return 1;
      case QuestionType.Combobox:
        return 2;
      case QuestionType.LongText:
        return 3;
      case QuestionType.ShortText:
        return 4;
      case QuestionType.Radio:
        return 5;
      case QuestionType.Scale5:
        return 6;
      case QuestionType.Scale10:
        return 7;
    }
  },
};
