import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import { Answer } from 'src/app/models/form-models/answer';
import { Result } from 'src/app/models/form-models/result';
import { AnswerComponent } from '../answer/answer.component';

@Component({
  selector: 'app-combobox-answer',
  templateUrl: './combobox-answer.component.html',
  styleUrls: ['./combobox-answer.component.css']
})
export class ComboboxAnswerComponent extends AnswerComponent {

  override ngOnInit(): void {
    const options: []= [];
    this.result = new Result(options);
  }

  updateResult = (event: MatOptionSelectionChange) => {
    const result = this.result;
    result.options = [{optionId: event.source.value.id, content:event.source.value.isChecked.toString()}];
    this.resultChanged.emit(result);
  }
}
