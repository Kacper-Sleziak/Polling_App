import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Answer} from 'src/app/models/form-models/answer';
import { QuestionType } from 'src/app/models/form-models/question';
import { Result } from 'src/app/models/form-models/result';

@Component({
  selector: 'app-form-answers',
  templateUrl: './form-answers.component.html',
  styleUrls: ['./form-answers.component.css']
})
export class FormAnswersComponent implements OnInit {
  @Input() answers: Answer[] = [];
  @Input() type: QuestionType = QuestionType.Checkbox;
  @Input() questionId!: number;
  @Output() onResult: EventEmitter<Result> = new EventEmitter();
  questionType: typeof QuestionType = QuestionType;


  onResultChanged = (event: Result) => {
    this.onResult.emit(event);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
