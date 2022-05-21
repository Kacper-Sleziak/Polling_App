import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import { Answer } from 'src/app/models/form-models/answer';
import { Result } from 'src/app/models/form-models/result';
import { AnswerComponent } from '../answer/answer.component';

@Component({
  selector: 'app-combobox-answer',
  templateUrl: './combobox-answer.component.html',
  styleUrls: ['./combobox-answer.component.css'],
})
export class ComboboxAnswerComponent extends AnswerComponent {
  override ngOnInit(): void {
    const options: { optionId: number; content: string }[] = [];
    for (const answer of this.answers) {
      options.push({
        optionId: answer.id,
        content: answer.isChecked.toString(),
      });
    }
    this.result = new Result(options);
  }

  ngOnChange(): void {
    const options: { optionId: number; content: string }[] = [];
    for (const answer of this.answers) {
      options.push({
        optionId: answer.id,
        content: answer.isChecked.toString(),
      });
    }
    this.result = new Result(options);
  }

  updateResult = (event: MatOptionSelectionChange) => {
    let options: { optionId: number; content: string }[] = [];
    for (const answer of this.answers) {
      options.push({
        optionId: answer.id,
        content: answer.isChecked.toString(),
      });
    }

    for (const option of options) {
      if (option.optionId === event.source.value.id) {
        option.content = event.source.selected.toString();
        options = [option];
      }
    }
    this.result = new Result(options);
    this.resultChanged.emit(this.result);
  };
}
