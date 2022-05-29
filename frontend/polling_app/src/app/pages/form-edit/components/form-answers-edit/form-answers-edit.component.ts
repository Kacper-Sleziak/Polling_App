import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Answer } from 'src/app/models/form-models/answer';
import { QuestionType } from 'src/app/models/form-models/question';

@Component({
  selector: 'app-form-answers-edit',
  templateUrl: './form-answers-edit.component.html',
  styleUrls: ['./form-answers-edit.component.css'],
})
export class FormAnswersEditComponent implements OnInit {
  @Input() answers: Answer[] = [];
  @Input() type: QuestionType = QuestionType.Checkbox;
  @Input() questionId!: number;
  @Output() onAnswerRemove: EventEmitter<Answer> = new EventEmitter();
  questionType: typeof QuestionType = QuestionType;
  constructor() {}

  ngOnInit(): void {}

  createNewAnswer = (answer: Answer) => {
    this.answers.push(answer);
  };

  removeAnswer = (answer: Answer) => {
    this.answers = this.answers.filter((a) => a !== answer);
    this.onAnswerRemove.emit(answer);
  };
}
