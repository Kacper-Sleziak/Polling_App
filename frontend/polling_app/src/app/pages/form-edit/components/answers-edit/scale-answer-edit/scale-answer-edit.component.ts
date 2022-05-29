import { Component, Input, OnInit } from '@angular/core';
import { AnswerEditComponent } from '../answer-edit/answer-edit.component';

@Component({
  selector: 'app-scale-answer-edit',
  templateUrl: './scale-answer-edit.component.html',
  styleUrls: ['./scale-answer-edit.component.css'],
})
export class ScaleAnswerEditComponent extends AnswerEditComponent {
  @Input() scale = 5;
}
