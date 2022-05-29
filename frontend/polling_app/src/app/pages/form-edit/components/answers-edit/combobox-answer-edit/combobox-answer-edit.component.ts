import { Component, OnInit } from '@angular/core';
import { QuestionType } from 'src/app/models/form-models/question';
import { AnswerEditComponent } from '../answer-edit/answer-edit.component';

@Component({
  selector: 'app-combobox-answer-edit',
  templateUrl: './combobox-answer-edit.component.html',
  styleUrls: ['./combobox-answer-edit.component.css'],
})
export class ComboboxAnswerEditComponent extends AnswerEditComponent {
  handleNewAnswerInput = (event: Event) => {
    return this.handleNewAnswer(event, QuestionType.Combobox);
  };
}
