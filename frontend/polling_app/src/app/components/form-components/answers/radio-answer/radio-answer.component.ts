import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { Result } from 'src/app/models/form-models/result';
import { AnswerComponent } from '../answer/answer.component';

@Component({
  selector: 'app-radio-answer',
  templateUrl: './radio-answer.component.html',
  styleUrls: ['./radio-answer.component.css']
})
export class RadioAnswerComponent extends AnswerComponent{

  updateResult = (event: MatRadioChange) => {
    this.resultChanged.emit(new Result([{optionId: event.value.id, content: "true"}]));
  }

}
