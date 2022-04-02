import { Component, Input, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Result } from 'src/app/models/form-models/result';
import { AnswerComponent } from '../answer/answer.component';

@Component({
  selector: 'app-checkbox-answer',
  templateUrl: './checkbox-answer.component.html',
  styleUrls: ['./checkbox-answer.component.css']
})
export class CheckboxAnswerComponent extends AnswerComponent {
  
  override ngOnInit(): void {
    const options = [];
    for (const answer of this.answers) {
      options.push({optionId: answer.id, content: answer.isChecked.toString()});
    }
    this.result = new Result(this.answerId, options);
  }

  updateResult = (optionId: number, event: MatCheckboxChange) => {
    const result = this.result;
    for (const option of result.options) {
      if(option.optionId === optionId) option.content = event.checked.toString();
    }
    this.resultChanged.emit(result);
  }
}
