import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
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
  title: string = 'Przykładowy tytuł';
  description: string = 'Przykładowy opis';
  questionResult: Map<Question, Result> = new Map();

  constructor(
    private pollService: PollService,
    private questionViewModelService: QuestionViewModelService,
    private formResultService: FormResultService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug !== null) {
      this.pollService.getPoll(slug).subscribe((poll) => {
        this.title = poll.title;
        this.description = poll.description;
        this.questionViewModelService.loadPollQuestions(poll.id);
        this.questionViewModelService
          .onUpdate()
          .subscribe((q: Question[]) => (this.questions = q));
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
      this.router.navigate(['greetings']);
    });
  };
}
