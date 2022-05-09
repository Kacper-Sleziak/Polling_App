import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Answer } from '../../models/form-models/answer';
import { Question, QuestionType } from '../../models/form-models/question';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  questions: Question[] = [];
  questionNewId: number = 0;
  answerNewId: number = 0;

  constructor(private http: HttpClient) {
    this.questions.push(
      new Question(this.questionNewId++, 'Pytanie wielokrotnego wyboru', [
        new Answer(this.answerNewId++, 'Odpowiedź 1'),
        new Answer(this.answerNewId++, 'Odpowiedź 2'),
        new Answer(this.answerNewId++, 'Odpowiedź 3'),
        new Answer(this.answerNewId++, 'Odpowiedź 4'),
      ])
    );

    this.questions.push(
      new Question(
        this.questionNewId++,
        'Pytanie jednokrotnego wyboru combo',
        [
          new Answer(this.answerNewId++, 'Odpowiedź 1'),
          new Answer(this.answerNewId++, 'Odpowiedź 2'),
          new Answer(this.answerNewId++, 'Odpowiedź 3'),
          new Answer(this.answerNewId++, 'Odpowiedź 4'),
        ],
        QuestionType.Combobox
      )
    );

    this.questions.push(
      new Question(
        this.questionNewId++,
        'Pytanie jednokrotnego wyboru radio',
        [
          new Answer(this.answerNewId++, 'Odpowiedź 1', QuestionType.Radio),
          new Answer(this.answerNewId++, 'Odpowiedź 2', QuestionType.Radio),
          new Answer(this.answerNewId++, 'Odpowiedź 3', QuestionType.Radio),
          new Answer(this.answerNewId++, 'Odpowiedź 4', QuestionType.Radio),
        ],
        QuestionType.Radio
      )
    );

    this.questions.push(
      new Question(
        this.questionNewId++,
        'Pytanie odpowiedź długa',
        [
          new Answer(this.answerNewId++, 'Odpowiedź 1'),
          new Answer(this.answerNewId++, 'Odpowiedź 2'),
          new Answer(this.answerNewId++, 'Odpowiedź 3'),
          new Answer(this.answerNewId++, 'Odpowiedź 4'),
        ],
        QuestionType.LongText
      )
    );

    this.questions.push(
      new Question(
        this.questionNewId++,
        'Pytanie odpowiedź krótka',
        [
          new Answer(this.answerNewId++, 'Odpowiedź 1'),
          new Answer(this.answerNewId++, 'Odpowiedź 2'),
          new Answer(this.answerNewId++, 'Odpowiedź 3'),
          new Answer(this.answerNewId++, 'Odpowiedź 4'),
        ],
        QuestionType.ShortText
      )
    );

    this.questions.push(
      new Question(
        this.questionNewId++,
        'Pytanie skala 5-punktowa',
        [
          new Answer(this.answerNewId++, 'Odpowiedź 1'),
          new Answer(this.answerNewId++, 'Odpowiedź 2'),
          new Answer(this.answerNewId++, 'Odpowiedź 3'),
          new Answer(this.answerNewId++, 'Odpowiedź 4'),
        ],
        QuestionType.Scale5
      )
    );

    this.questions.push(
      new Question(
        this.questionNewId++,
        'Pytanie skala 10-punktowa',
        [
          new Answer(this.answerNewId++, 'Odpowiedź 1'),
          new Answer(this.answerNewId++, 'Odpowiedź 2'),
          new Answer(this.answerNewId++, 'Odpowiedź 3'),
          new Answer(this.answerNewId++, 'Odpowiedź 4'),
        ],
        QuestionType.Scale10
      )
    );
  }

  getQuestions(id: number): Observable<Question[]> {
    return this.http
      .get(`${environment.apiUrl}/questions/question/poll/${id}`)
      .pipe(
        map((result: any) => {
          const questions: Question[] = [];
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
          return questions;
        })
      );
  }
}

const QuestionTypeFactory = {
  getType: (typeId: number): QuestionType => {
    console.log(typeId);
    switch (typeId) {
      case 2:
        return QuestionType.Checkbox;
      case 3:
        return QuestionType.Combobox;
      case 4:
        return QuestionType.LongText;
      case 5:
        return QuestionType.ShortText;
      case 6:
        return QuestionType.Radio;
      case 7:
        return QuestionType.Scale5;
      case 8:
        return QuestionType.Scale10;
    }
    return QuestionType.Checkbox;
  },
};
