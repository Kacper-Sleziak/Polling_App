import { Component, OnInit } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { Answer } from 'src/app/models/form-models/answer';
import { Result } from 'src/app/models/form-models/result';
import { AnswerComponent } from '../answer/answer.component';

@Component({
  selector: 'app-text-answer',
  templateUrl: './text-answer.component.html',
  styleUrls: ['./text-answer.component.css']
})
export class TextAnswerComponent extends AnswerComponent {

  updateResult = (event: Event, answer: Answer) => {
    const target = event.target as HTMLInputElement;
    answer.result = target.value

    const options: {optionId: number, content: string}[] = [];
    for (const answer of this.answers) {
      options.push({optionId: answer.id, content: answer.result});  
    }
    this.result = new Result(this.answerId, options);
    this.resultChanged.emit(this.result);
  }
}
