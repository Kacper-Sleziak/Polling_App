import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { Answer } from 'src/app/models/form-models/answer';
import { QuestionType } from 'src/app/models/form-models/question';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  constructor(private http: HttpClient) {}

  getAnswers(id: number): Observable<Answer[]> {
    return this.http
      .get(`${environment.apiUrl}/questions/option/question/${id}`)
      .pipe(
        map((result: any) => {
          console.log('result', result);
          const answers: Answer[] = [];
          for (let answer of result) {
            answers.push(new Answer(answer.id, answer.content));
          }
          return answers;
        })
      );
  }

  postAnswer(answer: Answer, questionId: number): Observable<Answer> {
    return this.http.post<Answer>(
      `${environment.apiUrl}/questions/option/create/`,
      {
        content: answer.answer,
        question: questionId,
      }
    );
  }

  putAnswer(answer: Answer, questionId: number): Observable<Answer> {
    return this.http.put<Answer>(
      `${environment.apiUrl}/questions/option/${answer.id}/`,
      {
        content: answer.answer,
        question: questionId,
      }
    );
  }

  saveAnswers(answers: Answer[], questionId: number): Observable<Answer[]> {
    const obs: Observable<Answer>[] = [];
    for (const answer of answers) {
      if (answer.id === -1) {
        obs.push(this.postAnswer(answer, questionId));
      } else {
        obs.push(this.putAnswer(answer, questionId));
      }
    }
    return forkJoin(obs);
  }

  removeAnswers(answersToRemove: number[]): Observable<any[]> {
    const obs: Observable<any>[] = [];
    for (const answerId of answersToRemove) {
      obs.push(
        this.http.delete(`${environment.apiUrl}/questions/option/${answerId}/`)
      );
    }
    return forkJoin(obs);
  }
}
