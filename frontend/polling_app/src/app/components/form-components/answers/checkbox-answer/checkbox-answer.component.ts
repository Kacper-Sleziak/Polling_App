import { Component, Input, OnInit } from '@angular/core';
import { Answer } from 'src/app/models/form-models/answer';
import { AnswerComponent } from '../answer/answer.component';

@Component({
  selector: 'app-checkbox-answer',
  templateUrl: './checkbox-answer.component.html',
  styleUrls: ['./checkbox-answer.component.css']
})
export class CheckboxAnswerComponent extends AnswerComponent {


}
