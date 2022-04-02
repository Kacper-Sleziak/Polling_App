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
  questionNewId: number = 0;
  answerNewId: number = 0;

  constructor() {
      this.questions.push(
        new Question(
          this.questionNewId++,
          "Pytanie wielokrotnego wyboru", 
          [new Answer(this.answerNewId++, "Odpowiedź 1"), 
          new Answer(this.answerNewId++, "Odpowiedź 2"), 
          new Answer(this.answerNewId++, "Odpowiedź 3"), 
          new Answer(this.answerNewId++, "Odpowiedź 4")]
        )
      )

      this.questions.push(
        new Question(
          this.questionNewId++,
          "Pytanie jednokrotnego wyboru combo", 
          [new Answer(this.answerNewId++, "Odpowiedź 1"), 
          new Answer(this.answerNewId++, "Odpowiedź 2"), 
          new Answer(this.answerNewId++, "Odpowiedź 3"), 
          new Answer(this.answerNewId++, "Odpowiedź 4")],
          QuestionType.Combobox
        )
      )

      this.questions.push(
        new Question(
          this.questionNewId++,
          "Pytanie jednokrotnego wyboru radio", 
          [new Answer(this.answerNewId++, "Odpowiedź 1", QuestionType.Radio), 
          new Answer(this.answerNewId++, "Odpowiedź 2", QuestionType.Radio), 
          new Answer(this.answerNewId++, "Odpowiedź 3", QuestionType.Radio), 
          new Answer(this.answerNewId++, "Odpowiedź 4", QuestionType.Radio)],
          QuestionType.Radio
        )
      )

      this.questions.push(
        new Question(
          this.questionNewId++,
          "Pytanie prawda/fałsz", 
          [new Answer(this.answerNewId++, "Odpowiedź 1"), 
          new Answer(this.answerNewId++, "Odpowiedź 2"), 
          new Answer(this.answerNewId++, "Odpowiedź 3"), 
          new Answer(this.answerNewId++, "Odpowiedź 4")],
          QuestionType.TrueFalse
        )
      )

      this.questions.push(
        new Question(
          this.questionNewId++,
          "Pytanie odpowiedź długa", 
          [new Answer(this.answerNewId++, "Odpowiedź 1"), 
          new Answer(this.answerNewId++, "Odpowiedź 2"), 
          new Answer(this.answerNewId++, "Odpowiedź 3"), 
          new Answer(this.answerNewId++, "Odpowiedź 4")],
          QuestionType.LongText
        )
      )

      this.questions.push(
        new Question(
          this.questionNewId++,
          "Pytanie odpowiedź krótka", 
          [new Answer(this.answerNewId++, "Odpowiedź 1"), 
          new Answer(this.answerNewId++, "Odpowiedź 2"), 
          new Answer(this.answerNewId++, "Odpowiedź 3"), 
          new Answer(this.answerNewId++, "Odpowiedź 4")],
          QuestionType.ShortText
        )
      )

      this.questions.push(
        new Question(
          this.questionNewId++,
          "Pytanie skala 5-punktowa", 
          [new Answer(this.answerNewId++, "Odpowiedź 1"), 
          new Answer(this.answerNewId++, "Odpowiedź 2"), 
          new Answer(this.answerNewId++, "Odpowiedź 3"), 
          new Answer(this.answerNewId++, "Odpowiedź 4")],
          QuestionType.Scale5
        )
      )

      this.questions.push(
        new Question(
          this.questionNewId++,
          "Pytanie skala 10-punktowa", 
          [new Answer(this.answerNewId++, "Odpowiedź 1"), 
          new Answer(this.answerNewId++, "Odpowiedź 2"), 
          new Answer(this.answerNewId++, "Odpowiedź 3"), 
          new Answer(this.answerNewId++, "Odpowiedź 4")],
          QuestionType.Scale10
        )
      )
    
  }

  getQuestions(): Observable<Question[]>{
    return of(this.questions)
  }
}
