import { Component, Input, OnInit } from '@angular/core';
import { Answer } from 'src/app/models/form-models/answer';
import { QuestionType } from 'src/app/models/form-models/question';
import { AnswerEditComponent } from '../answer-edit/answer-edit.component';

@Component({
  selector: 'app-scale-answer-edit',
  templateUrl: './scale-answer-edit.component.html',
  styleUrls: ['./scale-answer-edit.component.css'],
})
export class ScaleAnswerEditComponent extends AnswerEditComponent {
  @Input() scale = 5;
  public override ngOnInit(): void {
    if (this.answers.length === 0) {
      this.newAnswerCreated.emit(
        new Answer(-1, 'Wprowadź odpowiedź:', QuestionType.ShortText)
      );
    }
  }
}
