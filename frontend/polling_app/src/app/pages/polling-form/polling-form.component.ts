import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Poll } from 'src/app/models/dashboard-models/poll';
import { Question } from 'src/app/models/form-models/question';
import { Result } from 'src/app/models/form-models/result';
import { PollService } from 'src/app/services/dashboard-services/poll.service';
import { FormResultService } from 'src/app/services/form-services/form-result.service';
import { QuestionViewModelService } from 'src/app/services/form-services/question-view-model.service';

@Component({
  selector: 'app-polling-form',
  templateUrl: './polling-form.component.html',
  styleUrls: ['./polling-form.component.css'],
})
export class PollingFormComponent implements OnInit {

  questions: Question[] = [];
  poll!: Poll;
  questionResult: Map<Question, Result> = new Map();

  constructor(
    private pollService: PollService,
    private questionViewModelService: QuestionViewModelService,
    private formResultService: FormResultService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    // Init subscription
    this.questionViewModelService
        .onUpdate()
        .subscribe((q: Question[]) => {
          console.warn("Subscription");
          this.questions = q
        });
  }

  ngOnInit(): void {
    // Retrive slug from path
    const slug = this.route.snapshot.paramMap.get('slug');

    if (slug !== null) {
      // Fetch poll date
      this.pollService.getPoll(slug).subscribe((poll: Poll) => {
          // Asign poll property
          this.poll = poll;
          // Load questions to service
          this.questionViewModelService.loadPollQuestions(poll.id).subscribe({
            next: (questions) =>{              
              this.questions = questions;
            },
            error: (err)  => {
              console.log(err);
            }
          });
        });
    }
  }

  updateAnswer = (question: Question, result: Result) => {
    this.questionViewModelService.updateAnswer(question, result);
    this.questions = this.questionViewModelService.getQuestions();
  };

  handleSendAnswer = () => {
    const results = this.questionViewModelService.getResults();
    let obs = [];
    for (const question of results.keys()) {
      let answers = [];
      let res = results.get(question);
      let options = [];
      if (res !== undefined) {
        for (let option of res.options) {
          if (option.content === 'false') continue;
          options.push({
            option_id: option.optionId,
            text_answer: option.content,
          });
        }
      }
      let result = { question_id: question.id, answers: options };
      obs.push(this.formResultService.saveResult(result));
    }
    forkJoin(obs).subscribe((r) => {
      
      // Update poll (increase filled number)
      this.poll.filled += 1;
      this.poll.sent += 1;
        this.pollService.putPoll(this.poll).subscribe({
          error: (err) =>{
            console.log(err);
          }
        }
        );
      // Navigate to greetings
      this.router.navigate(['greetings']);
    });
  };
}
