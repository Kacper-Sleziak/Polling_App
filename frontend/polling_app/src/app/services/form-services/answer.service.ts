import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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
}
