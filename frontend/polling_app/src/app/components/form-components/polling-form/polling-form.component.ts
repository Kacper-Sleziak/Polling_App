import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/models/form-models/question';
import { Result } from 'src/app/models/form-models/result';
import { PollService } from 'src/app/services/dashboard-services/poll.service';
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
    private route: ActivatedRoute
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
    let result = this.questionViewModelService.getResults();
    /* for (let question of result.keys()) {
      console.log(question.id, result.get(question));
    }*/
    console.log(result);
  };
}
