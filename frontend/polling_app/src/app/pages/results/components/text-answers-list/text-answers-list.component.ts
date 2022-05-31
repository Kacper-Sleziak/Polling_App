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

    if(!this.disableBadge){
      // Count duplicates
      const counts = new Map<string, number>();
      this.results.forEach((result: AnswerStats) => {
        counts.set(result.name, (counts.get(result.name) || 0) + 1);
      });

      let newArray: AnswerStats[] = [];
      counts.forEach((value: number, key: string) => {
        newArray.push(new AnswerStats( key, value));
        newArray.sort((a: AnswerStats, b: AnswerStats) =>{
          if(a.value > b.value) return -1;
          else if(a.value == b.value) return 0;
          else return 1;
        });
      })
      this.results = newArray;
    }
  }

}
