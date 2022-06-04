import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Poll } from 'src/app/models/dashboard-models/poll';
import { QuestionType } from 'src/app/models/form-models/question';
import { AnswerStats } from 'src/app/models/results/answer-stats';
import { PollResults } from 'src/app/models/results/poll-results';
import { QuestionStats } from 'src/app/models/results/question-stats';
import { ResultsService } from 'src/app/services/results-services/results.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})


export class ResultsComponent implements OnInit {

  pollResults!: PollResults;
  responeRatio: number = 0;
  QuestionType = QuestionType;   // For the access to enum type from component's html
  loading: boolean = false;

  constructor(
              private route: ActivatedRoute,
              private router: Router,
              private resultsService: ResultsService) {}

  ngOnInit(): void{
    
    // Gets poll's slug from path
    const slug = this.route.snapshot.paramMap.get('slug');    
    // Loading 
    this.loading = true;

    if(slug != null){
      // Fetch poll results
      this.resultsService.getResults(slug).subscribe({
        // If success
        next: (resp: any[]) =>{

          let response = resp[0];
          // Parse poll data
          let poll = new Poll(-1, 
                      response.title, 
                      response.description, 
                      slug, 
                      response.start_date, 
                      response.end_date, 
                      response.create_date, 
                      response.filling, 
                      response.sent, 0 , -1)
          
          let questionsStats: QuestionStats[] = []; 
          // Iterate after questions array
          response.question.forEach(
            (question : any) => {

              // Parse question data
              let answersStats: AnswerStats[] = [];
              let questionType: number = question.question_type;

              // Short/LongText parsing
              if(questionType === QuestionType.ShortText + 1 || questionType === QuestionType.LongText + 1){

                // Iterate after array with answers
                question.answer.forEach(
                  (answer: any) => {
                    // Get text and add new answerStats
                    answersStats.push(new AnswerStats(answer.answerdetails[0].text_answer, 1));
                  }
                )
              }
              // Scale5/Scale10 parsing
              else if(questionType === QuestionType.Scale5 + 1 || questionType === QuestionType.Scale10 + 1){

                // Prepare table to count answers
                let statisticTable: number[] = new Array(11).fill(0);

                // Count answers
                question.answer.forEach(
                  (answer: any) => {
                    statisticTable[Number(answer.answerdetails[0].text_answer)] += 1;         
                  }
                )

                let scaleSize: number;
                if(questionType === QuestionType.Scale5 + 1) scaleSize = 5;
                else scaleSize = 10;

                for(let i = 0; i < scaleSize ; i++){
                  answersStats.push(new AnswerStats( (i+1).toString(), statisticTable[i])); 
                }
              }
              else{

                // Iterate after all possible question options
                question.option.forEach(
                  (option: any) => {
                    
                    // Init stats for each option
                    let answerStats = new AnswerStats(option.content, 0);

                    // Connect option name with number of its occurrence (only when bigger than 0)
                    question.option_count.some(
                      (optionCount: any) =>{
                        
                        if(optionCount.answerdetails__option_id === option.id){
                          // Update number of occurance
                          answerStats.value = optionCount.count;
                          // Break loop
                          return true;
                        }
                        return false;                   
                      }
                    )
                    // Add answer stats
                    answersStats.push(answerStats);                    
                  }
                )
              }
              // Add questionStats
              questionsStats.push(new QuestionStats(question.content, question.question_type, question.required, question.answer_count, answersStats));
            }
          )
          // Assign value to pollResults property 
          this.pollResults = new PollResults(poll, questionsStats);
          console.log(this.pollResults);
          
          // Calculate response ratio
          if(this.pollResults.poll.sent !== 0) this.responeRatio = (this.pollResults.poll.filled/this.pollResults.poll.sent)*100;
          // Loading false
          this.loading = false;
        },
        error: (err: any) => {
          console.log(err);
          // Loading false
          this.loading = false;
        }
      })
      
    }
    else{
      this.router.navigate(['dashboard']);
    }
  }

  onReturnClick(){
    this.router.navigate(['dashboard']);
  }
}


