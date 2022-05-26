import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { AnswerStats } from 'src/app/models/results/answer-stats';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  @Input() results: AnswerStats[] = []; 
  @Input() width: number = 700;
  @Input() height: number = 300;
  @Input() legend: boolean = true;
  @Input() legendTitle: string = "Legenda";
  @Input() legendPosition: LegendPosition = LegendPosition.Right;
  @Input() labels: boolean = true;
  

  @ViewChild('chartWrapper') chartWrapper!: ElementRef<HTMLDivElement>;

  view: [number, number] = [700,300];
  allAnswersCount: number = 0;


  
  constructor() {}

  ngOnInit(): void {
    // Set size of chart
    this.view = [this.width, this.height];
    // Count number of answers to simplify counting percent value
    this.allAnswersCount = this.countNumberOfAnswers(this.results);    
    
    // Implement labelFormatting function (here because now we have data in results array)
    this.labelFormatting = (name: string): string =>{

      let answerCount = 0;    
      
      this.results.some((answer) => {
        if(answer.name === name){
          answerCount = answer.value;
          return true; //break loop
        }
        return false;
      }
    )

    return this.countPercent(answerCount);
    }
    
  }

  ngAfterViewInit(): void {

    this.chartWrapper.nativeElement.style.width = this.width.toString() + 'px';
    this.chartWrapper.nativeElement.style.height = this.height.toString() + 'px';
  }


  // Methods
  countNumberOfAnswers(dataToChart : AnswerStats[]): number{
    let sum: number = 0;

    dataToChart.forEach((answerStats) => {
      sum += answerStats.value;
    })
    return sum;
  }

  countPercent(part : number): string{
    return ((part/this.allAnswersCount)*100).toFixed(1) + '%';
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

  labelFormatting!: Function;



}
