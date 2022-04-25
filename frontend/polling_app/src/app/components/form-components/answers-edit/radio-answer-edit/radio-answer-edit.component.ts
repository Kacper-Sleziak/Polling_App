import { Component, OnInit } from '@angular/core';
import { QuestionType } from 'src/app/models/form-models/question';
import { AnswerEditComponent } from '../answer-edit/answer-edit.component';

@Component({
  selector: 'app-radio-answer-edit',
  templateUrl: './radio-answer-edit.component.html',
  styleUrls: ['./radio-answer-edit.component.css'],
})
export class RadioAnswerEditComponent extends AnswerEditComponent {
  handleNewAnswerInput = (event: Event) => {
    return this.handleNewAnswer(event, QuestionType.Radio);
  };
}
