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
    new AnswerStats("To jest bardzo długa odpowiedź, ale jest zastosowany odpowiedni mechanizm, który odpowiednio przycina teksts To jest bardzo długa odpowiedź, ale jest zastosowany odpowiedni mechanizm, który odpowiednio przycina teksts", 2),
    new AnswerStats("To nie ma sensu raczej", 5),
    new AnswerStats("Fajnie", 99),
    new AnswerStats("Jeszcze jak ", 0),
    new AnswerStats("To jestd bardzo długa odpowiedź, ale jest zastosowany odpowiedni mechanizm, który odpowiednio przycina tekst", 5),
    new AnswerStats("To jestd bardzo długa odpowiedź, ale jest zastosowany odpowiedni mechanizm, który odpowiednio przycina tekstsssss", 2),
    new AnswerStats("To nied ma sensu raczej", 5),
    new AnswerStats("Fajnied", 10),
    new AnswerStats("Jeszczed jak ", 0),
    new AnswerStats("To jestd bardzo asddługa odpowiedź, ale jest zastosowany odpowiedni mechanizm, który odpowiednio przycina teksttt", 5),
    new AnswerStats("To jestd barasddzo długa odpowiedź, ale jest zastosowany odpowiedni mechanizm, który odpowiednio przycina teksts", 2),
    new AnswerStats("To nied asdma sensu raczej", 5),
    new AnswerStats("Fajasdnied", 10),
    new AnswerStats("Jeszasdczed jak ", 0)
  ]

  public dataToChart2 : AnswerStats[] = [
    new AnswerStats("1", 5),
    new AnswerStats("2", 100),
    new AnswerStats("3", 5),
    new AnswerStats("4", 10),
    new AnswerStats("5 ", 3)
  ]

  public dataToChart3 : AnswerStats[] = [
    new AnswerStats("1", 5),
    new AnswerStats("2", 100),
    new AnswerStats("3", 5),
    new AnswerStats("4", 10),
    new AnswerStats("5 ", 3),
    new AnswerStats("6", 5),
    new AnswerStats("7", 120),
    new AnswerStats("8", 54),
    new AnswerStats("9", 1),
    new AnswerStats("10 ", 33)
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
}
