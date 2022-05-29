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

  ngOnChange(): void {

  }

  updateResult = (event: MatRadioChange) => {
    const options: {optionId: number, content: string}[] = [];
    for (const answer of this.answers) {
      if(answer.id === event.value.id){
        options.push({optionId: answer.id, content: "true"});
      }else{
        options.push({optionId: answer.id, content: "false"});
      }
    }
    this.resultChanged.emit(new Result(options));
  }

}
