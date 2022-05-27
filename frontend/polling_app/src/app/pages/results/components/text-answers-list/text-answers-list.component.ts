import { Component, Input, OnInit } from '@angular/core';
import { AnswerStats } from 'src/app/models/results/answer-stats';

@Component({
  selector: 'app-text-answers-list',
  templateUrl: './text-answers-list.component.html',
  styleUrls: ['./text-answers-list.component.css']
})
export class TextAnswersListComponent implements OnInit {

  @Input() results: AnswerStats[] = []; 
  @Input() disableBadge: boolean = false; 
  
  constructor() { }

  ngOnInit(): void {
  }

}
