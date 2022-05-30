import { Component, OnInit } from '@angular/core';
import { Answer } from 'src/app/models/form-models/answer';
import { QuestionType } from 'src/app/models/form-models/question';
import { AnswerEditComponent } from '../answer-edit/answer-edit.component';

@Component({
  selector: 'app-short-text-answer-edit',
  templateUrl: './short-text-answer-edit.component.html',
  styleUrls: ['./short-text-answer-edit.component.css'],
})
export class ShortTextAnswerEditComponent extends AnswerEditComponent {
  public override ngOnInit(): void {
    if (this.answers.length === 0) {
      this.newAnswerCreated.emit(
        new Answer(-1, 'Wprowadź odpowiedź:', QuestionType.ShortText)
      );
    }
  }
}
