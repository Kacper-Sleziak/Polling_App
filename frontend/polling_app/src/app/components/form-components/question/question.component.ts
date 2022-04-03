import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from 'src/app/models/form-models/question';
import { Result } from 'src/app/models/form-models/result';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() question!: Question;
  @Output() onAnswer: EventEmitter<Result> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onResult = (event: Result) => {
    this.onAnswer.emit(event);
  }
}
