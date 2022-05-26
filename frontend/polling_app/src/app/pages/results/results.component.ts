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


  splitLongAnswer = (answer: string, bound: number): string[] => {

    // If answer length is lower then setted bound - do nothing
    if(answer.length <= bound) return [answer];

    // Split answer via " "
    let strings: string[] = []; 
    strings = answer.split(" ");
  
    let concatStrings: string[] = []; 
    let newStr = strings[0];

    // Go through thw strings table and concatenate elements until length is lower then bound
    for(let i = 1; i < strings.length; i++ ){

      // If empty string -> continue
      if(strings[i].length == 0) continue;

      if(newStr.length < bound){
        newStr += " " + strings[i];
        
        if(i == strings.length-1){
          // Push no matter at length of newStr
          concatStrings.push(newStr);
        }
      }
      else{
        concatStrings.push(newStr);
        newStr = " " + strings[i];
      }
    }
    return concatStrings;
  }

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

  axisYFormat = (val: number) => {
    if (val % 1 === 0) {
      return val.toLocaleString();
    } else {
      return '';
    }
  }

  axisXFormat = (val: string) => {

    val.replace(' ', "\n")
    return val;
  }

  onPDFDownload(){

    console.log(this.dataToChart);
    
    this.http.get(`${environment.apiUrl}/pdf/2`).subscribe(() => {
    });
  }

}
