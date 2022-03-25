import { Component, Input, OnInit } from '@angular/core';
import { Answer } from 'src/app/models/form-models/answer';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  @Input() answers: Answer [] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
