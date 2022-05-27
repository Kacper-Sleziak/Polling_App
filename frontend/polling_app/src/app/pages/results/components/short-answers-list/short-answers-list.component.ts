import { Component, Input, OnInit } from '@angular/core';
import { AnswerStats } from 'src/app/models/results/answer-stats';

@Component({
  selector: 'app-short-answers-list',
  templateUrl: './short-answers-list.component.html',
  styleUrls: ['./short-answers-list.component.css']
})
export class ShortAnswersListComponent implements OnInit {

  @Input() results: AnswerStats[] = []; 

  constructor() { }

  ngOnInit(): void {
  }

}
