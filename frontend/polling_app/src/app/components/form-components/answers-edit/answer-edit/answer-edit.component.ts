import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Answer } from 'src/app/models/form-models/answer';
import { QuestionType } from 'src/app/models/form-models/question';

@Component({
  selector: 'app-answer-edit',
  templateUrl: './answer-edit.component.html',
  styleUrls: ['./answer-edit.component.css'],
})
export class AnswerEditComponent implements OnInit {
  @Input() answers: Answer[] = [];
  @Input() answerId!: number;
  @Output() newAnswerCreated: EventEmitter<Answer> = new EventEmitter();
  @Output() answerRemoved: EventEmitter<Answer> = new EventEmitter();

  newAnswer: string = '';
  constructor() {}

  ngOnInit(): void {}

  handleNewAnswer = (event: Event, questionType: QuestionType) => {
    const target = event.target as HTMLTextAreaElement;
    if (target.value !== null && target.value.length > 0) {
      this.newAnswerCreated.emit(new Answer(-1, target.value, questionType));
      target.value = '';
    }
  };

  handleAnswerRemove = (answer: Answer) => {
    this.answerRemoved.emit(answer);
  };

  handleAnswerChange = (event: Event, answer: Answer) => {
    const target = event.target as HTMLTextAreaElement;
    answer.answer = target.value;
  };
}
