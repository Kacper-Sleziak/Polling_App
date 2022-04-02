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
      this.questions.push(
        new Question(
          "Pytanie wielokrotnego wyboru", 
          [new Answer("Odpowiedź 1"), 
          new Answer("Odpowiedź 2"), 
          new Answer("Odpowiedź 3"), 
          new Answer("Odpowiedź 4")]
        )
      )

      this.questions.push(
        new Question(
          "Pytanie jednokrotnego wyboru combo", 
          [new Answer("Odpowiedź 1"), 
          new Answer("Odpowiedź 2"), 
          new Answer("Odpowiedź 3"), 
          new Answer("Odpowiedź 4")],
          QuestionType.Combobox
        )
      )

      this.questions.push(
        new Question(
          "Pytanie jednokrotnego wyboru radio", 
          [new Answer("Odpowiedź 1", QuestionType.Radio), 
          new Answer("Odpowiedź 2", QuestionType.Radio), 
          new Answer("Odpowiedź 3", QuestionType.Radio), 
          new Answer("Odpowiedź 4", QuestionType.Radio)],
          QuestionType.Radio
        )
      )

      this.questions.push(
        new Question(
          "Pytanie prawda/fałsz", 
          [new Answer("Odpowiedź 1"), 
          new Answer("Odpowiedź 2"), 
          new Answer("Odpowiedź 3"), 
          new Answer("Odpowiedź 4")],
          QuestionType.TrueFalse
        )
      )

      this.questions.push(
        new Question(
          "Pytanie odpowiedź długa", 
          [new Answer("Odpowiedź 1"), 
          new Answer("Odpowiedź 2"), 
          new Answer("Odpowiedź 3"), 
          new Answer("Odpowiedź 4")],
          QuestionType.LongText
        )
      )

      this.questions.push(
        new Question(
          "Pytanie odpowiedź krótka", 
          [new Answer("Odpowiedź 1"), 
          new Answer("Odpowiedź 2"), 
          new Answer("Odpowiedź 3"), 
          new Answer("Odpowiedź 4")],
          QuestionType.ShortText
        )
      )

      this.questions.push(
        new Question(
          "Pytanie skala 5-punktowa", 
          [new Answer("Odpowiedź 1"), 
          new Answer("Odpowiedź 2"), 
          new Answer("Odpowiedź 3"), 
          new Answer("Odpowiedź 4")],
          QuestionType.Scale5
        )
      )

      this.questions.push(
        new Question(
          "Pytanie skala 10-punktowa", 
          [new Answer("Odpowiedź 1"), 
          new Answer("Odpowiedź 2"), 
          new Answer("Odpowiedź 3"), 
          new Answer("Odpowiedź 4")],
          QuestionType.Scale10
        )
      )
    
  }

  getQuestions(): Observable<Question[]>{
    return of(this.questions)
  }
}
