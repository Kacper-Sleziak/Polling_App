import { Component, EventEmitter, Output } from '@angular/core';
import { Answer } from 'src/app/models/form-models/answer';
import { QuestionType } from 'src/app/models/form-models/question';
import { AnswerEditComponent } from '../answer-edit/answer-edit.component';

@Component({
  selector: 'app-checkbox-answer-edit',
  templateUrl: './checkbox-answer-edit.component.html',
  styleUrls: ['./checkbox-answer-edit.component.css'],
})
export class CheckboxAnswerEditComponent extends AnswerEditComponent {
  handleNewAnswerInput = (event: Event) => {
    return this.handleNewAnswer(event, QuestionType.Checkbox);
  };
}
