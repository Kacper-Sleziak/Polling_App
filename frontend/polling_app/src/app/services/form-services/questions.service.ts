import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Answer } from '../../models/form-models/answer';
import { Question, QuestionType } from '../../models/form-models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  questions: Question[] = [];

  constructor() {
    for(let i: number = 0; i < 5; i++){
      this.questions.push(
        new Question(
          "Pytanie " + i, 
          [new Answer("Odpowiedź 1"), 
          new Answer("Odpowiedź 2"), 
          new Answer("Odpowiedź 3"), 
          new Answer("Odpowiedź 4")]
        )
      )

      this.questions.push(
        new Question(
          "Pytanie " + i + " combo", 
          [new Answer("Odpowiedź 1"), 
          new Answer("Odpowiedź 2"), 
          new Answer("Odpowiedź 3"), 
          new Answer("Odpowiedź 4")],
          QuestionType.Combobox
        )
      )
    }
  }

  getQuestions(): Observable<Question[]>{
    return of(this.questions)
  }
}
