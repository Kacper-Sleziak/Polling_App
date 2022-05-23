import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FormResultService {
  saveResult(result: {
    question_id: number;
    answers: { option_id: number; text_answer: string }[];
  }): Observable<any> {
    return new Observable((subscription) => {
      this.createAnswer(result.question_id).subscribe(
        (answer: { id: number; question_id: number }) => {
          this.createAnswerDetails(answer.id, result.answers).subscribe(
            (
              r: {
                id: number;
                answers_id: number;
                text_answer: string;
                option_id: number;
              }[]
            ) => {
              subscription.next(r);
              subscription.complete();
            }
          );
        }
      );
    });
  }
  createAnswerDetails(
    id: number,
    answers: { option_id: number; text_answer: string }[]
  ): Observable<
    {
      id: number;
      answers_id: number;
      text_answer: string;
      option_id: number;
    }[]
  > {
    let obs: Observable<{
      id: number;
      answers_id: number;
      text_answer: string;
      option_id: number;
    }>[] = [];
    for (let answer of answers) {
      let req = this.http.post<{
        id: number;
        answers_id: number;
        text_answer: string;
        option_id: number;
      }>(`${environment.apiUrl}/answers/create_answerdetails`, {
        answers_id: id,
        text_answer: answer.text_answer,
        option_id: answer.option_id,
      });
      obs.push(req);
    }
    return forkJoin(obs);
  }
  createAnswer(
    question_id: any
  ): Observable<{ id: number; question_id: number }> {
    return this.http.post<{ id: number; question_id: number }>(
      `${environment.apiUrl}/answers/create_answers`,
      {
        question_id: question_id,
      }
    );
  }

  constructor(private http: HttpClient) {}
}
