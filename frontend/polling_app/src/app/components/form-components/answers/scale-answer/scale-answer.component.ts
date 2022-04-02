import { Component, Input, OnInit } from '@angular/core';
import { AnswerComponent } from '../answer/answer.component';

@Component({
  selector: 'app-scale-answer',
  templateUrl: './scale-answer.component.html',
  styleUrls: ['./scale-answer.component.css']
})
export class ScaleAnswerComponent extends AnswerComponent {
  @Input() scale: number = 5;
  results: boolean [] = [];

  override ngOnInit(): void {
    this.results = [];
    for(let i = 0; i < this.scale; i++){
      this.results.push(false);
    }
  }
}
