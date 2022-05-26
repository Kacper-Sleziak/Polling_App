import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { AnswerStats } from 'src/app/models/results/answer-stats';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})


export class ResultsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  legendPosition: LegendPosition = LegendPosition.Right;

  public dataToChart : AnswerStats[] = [
    new AnswerStats("To jest bardzo długa odpowiedź, ale jest zastosowany odpowiedni mechanizm, który odpowiednio przycina tekst", 5),
    new AnswerStats("To jest bardzo długa odpowiedź, ale jest zastosowany odpowiedni mechanizm, który odpowiednio przycina teksts", 2),
    new AnswerStats("To nie ma sensu raczej", 5),
    new AnswerStats("Fajnie", 10),
    new AnswerStats("Jeszcze jak ", 0)
  ]


  countNumberOfAnswers(dataToChart : AnswerStats[]): number{
    let sum: number = 0;

    dataToChart.forEach((answerStats) => {
      sum += answerStats.value;
    })
    return sum;
  }

  countPercent(part : number): string{

    return ((part/this.countNumberOfAnswers(this.dataToChart))*100).toFixed(1);
  }

  view: [number, number] = [700, 300];
  ans: string = "Odpowiedzi";
  yLabel: string = "Liczba"
  pos: LegendPosition = LegendPosition.Right
}
