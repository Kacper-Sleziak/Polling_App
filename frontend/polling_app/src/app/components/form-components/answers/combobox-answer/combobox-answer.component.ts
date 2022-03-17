import { Component, Input, OnInit } from '@angular/core';
import { Answer } from 'src/app/models/answer';
import { AnswerComponent } from '../answer/answer.component';

@Component({
  selector: 'app-combobox-answer',
  templateUrl: './combobox-answer.component.html',
  styleUrls: ['./combobox-answer.component.css']
})
export class ComboboxAnswerComponent extends AnswerComponent {
  @Input() answers: Answer[] = [];

}
