import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Answer } from 'src/app/models/form-models/answer';
import { Result } from 'src/app/models/form-models/result';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  @Input() answers: Answer [] = [];
  @Input() answerId!: number;
  @Output() result: Result = new Result(this.answerId, []);
  @Output() resultChanged: EventEmitter<Result> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
