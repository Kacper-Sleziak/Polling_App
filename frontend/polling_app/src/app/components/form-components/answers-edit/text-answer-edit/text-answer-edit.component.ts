import { Component, OnInit } from '@angular/core';
import { AnswerEditComponent } from '../answer-edit/answer-edit.component';

@Component({
  selector: 'app-text-answer-edit',
  templateUrl: './text-answer-edit.component.html',
  styleUrls: ['./text-answer-edit.component.css'],
})
export class TextAnswerEditComponent extends AnswerEditComponent {}
