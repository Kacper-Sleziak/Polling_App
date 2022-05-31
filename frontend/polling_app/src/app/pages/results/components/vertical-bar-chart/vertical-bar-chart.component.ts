import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { LegendPosition, LegendType } from '@swimlane/ngx-charts';
import { AnswerStats } from 'src/app/models/results/answer-stats';

@Component({
  selector: 'app-vertical-bar-chart',
  templateUrl: './vertical-bar-chart.component.html',
  styleUrls: ['./vertical-bar-chart.component.css']
})
export class VerticalBarChartComponent implements OnInit, AfterViewInit{

  @Input() results: AnswerStats[] = []; 
  @Input() width: number = 700;
  @Input() height: number = 300;
  @Input() legend: boolean = true;
  @Input() legendTitle: string = "Legenda";
  @Input() legendPosition: LegendPosition = LegendPosition.Right;
  // X axis props 
  @Input() xAxis: boolean = false;
  @Input() showXAxisLabel = false;
  @Input() xAxisLabel = "Odpowiedzi";
  // Y axis props
  @Input() yAxis = true;
  @Input() showYAxisLabel = true;
  @Input() yAxisLabel ="Liczba";
  @Input() rotateXAxisTicks = false;
  @Input() noBarWhenZero = false;

  @ViewChild('chartWrapper') chartWrapper!: ElementRef<HTMLDivElement>;

  view: [number, number] = [700,300];
  allAnswersCount: number = 0;

  constructor() {}

  ngAfterViewInit(): void {

    this.chartWrapper.nativeElement.style.width = this.width.toString() + 'px';
    this.chartWrapper.nativeElement.style.height = this.height.toString() + 'px';
  }

  ngOnInit(): void {
    // Set size of chart
    this.view = [this.width, this.height];
    // Count number of answers to simplify counting percent value
    this.allAnswersCount = this.countNumberOfAnswers(this.results);    
  }



  // ----------------------------- Methods -----------------------------

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

  yAxisTickFormatting = (val: number) => {
    if (val % 1 === 0) {
      return val.toLocaleString();
    } 
    else {
      return '';
    }
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

}
