import { Component, Input, OnInit } from '@angular/core';
import { Question, QuestionType } from 'src/app/models/form-models/question';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css'],
})
export class QuestionEditComponent implements OnInit {
  @Input() question!: Question;
  questionType?: string;
  questionTypes = Object.values(QuestionType).filter(
    (v) => !Number.isInteger(v)
  );

  constructor() {}

  ngOnInit(): void {}
}