import { Component, Input, OnInit } from '@angular/core';
import { Answer} from 'src/app/models/answer';
import { QuestionType } from 'src/app/models/question';

@Component({
  selector: 'app-form-answers',
  templateUrl: './form-answers.component.html',
  styleUrls: ['./form-answers.component.css']
})
export class FormAnswersComponent implements OnInit {
  @Input() answers: Answer[] = [];
  @Input() type: QuestionType = QuestionType.Checkbox;
  questionType: typeof QuestionType = QuestionType;

  constructor() { }

  ngOnInit(): void {
  }

}
