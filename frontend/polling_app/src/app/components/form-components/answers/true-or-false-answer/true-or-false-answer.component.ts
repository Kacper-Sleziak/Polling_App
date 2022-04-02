import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AnswerComponent } from '../answer/answer.component';
import {Answer} from '../../../../models/form-models/answer'
import { Result } from 'src/app/models/form-models/result';

@Component({
  selector: 'app-true-or-false-answer',
  templateUrl: './true-or-false-answer.component.html',
  styleUrls: ['./true-or-false-answer.component.css']
})
export class TrueOrFalseAnswerComponent extends AnswerComponent {

  updateResult = (event: MatSlideToggleChange, answer: Answer) => {
    answer.isChecked = true;
    const options: {optionId: number, content: string}[] = [];
    for (const answer of this.answers) {
      options.push({optionId: answer.id, content: answer.isChecked.toString()});
    }
    this.resultChanged.emit(new Result(this.answerId, options));
  }

}
