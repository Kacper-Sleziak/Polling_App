import { Component, Input, OnInit } from '@angular/core';
import { Answer } from 'src/app/models/form-models/answer';

@Component({
  selector: 'app-answer-edit',
  templateUrl: './answer-edit.component.html',
  styleUrls: ['./answer-edit.component.css'],
})
export class AnswerEditComponent implements OnInit {
  @Input() answers: Answer[] = [];
  @Input() answerId!: number;
  newAnswer: string = '';
  constructor() {}

  ngOnInit(): void {}
}
