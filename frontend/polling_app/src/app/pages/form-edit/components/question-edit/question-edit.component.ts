import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Answer } from 'src/app/models/form-models/answer';
import { Question, QuestionType } from 'src/app/models/form-models/question';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css'],
})
export class QuestionEditComponent implements OnInit {
  @Input() question!: Question;
  @Output() onQuestionCopy: EventEmitter<Question> = new EventEmitter();
  @Output() onQuestionRemove: EventEmitter<Question> = new EventEmitter();
  @Output() onQuestionMove: EventEmitter<{
    questionMoved: Question;
    moved: number;
  }> = new EventEmitter();
  @Output() onAnswerRemove: EventEmitter<Answer> = new EventEmitter();
  questionType?: string;
  questionTypes = Object.values(QuestionType).filter(
    (v) => !Number.isInteger(v)
  );

  constructor() {}

  ngOnInit(): void {}

  handleTypeSelectChange = (event: MatSelectChange) => {
    this.question.type = parseInt(event.toString()) as QuestionType;
  };

  handleQuestionCopy = () => {
    this.onQuestionCopy.emit(this.question);
  };

  handleQuestionRemove = () => {
    this.onQuestionRemove.emit(this.question);
  };

  handleQuestionMove = (event: number) => {
    this.onQuestionMove.emit({ questionMoved: this.question, moved: event });
  };

  handleQuestionChange = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    this.question.question = target.value;
  };
}
