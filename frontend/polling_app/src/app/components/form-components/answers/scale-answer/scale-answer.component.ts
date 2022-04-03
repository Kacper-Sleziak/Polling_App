import { Component, Input, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { Result } from 'src/app/models/form-models/result';
import { AnswerComponent } from '../answer/answer.component';

@Component({
  selector: 'app-scale-answer',
  templateUrl: './scale-answer.component.html',
  styleUrls: ['./scale-answer.component.css']
})
export class ScaleAnswerComponent extends AnswerComponent {
  @Input() scale: number = 5;
  results: boolean [] = [];

  updateResult = (event: MatRadioChange) =>{
    for (const option of this.result.options) {
      if(option.optionId === event.value.optionId){
        option.content = event.value.content.toString();
      }
    }
    this.resultChanged.emit(this.result);
  }

  override ngOnInit(): void {
    this.results = [];
    for(let i = 0; i < this.scale; i++){
      this.results.push(false);
    }
    const options: {optionId: number, content: string}[] = [];
    for (const answer of this.answers) {
      options.push({optionId: answer.id, content: ""});  
    }

    this.result = new Result(options);
  }
}
