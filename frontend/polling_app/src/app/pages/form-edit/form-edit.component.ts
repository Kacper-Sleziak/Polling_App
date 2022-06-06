import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { defaultIfEmpty } from 'rxjs';
import { Poll } from 'src/app/models/dashboard-models/poll';
import { Answer } from 'src/app/models/form-models/answer';
import { Question, QuestionType } from 'src/app/models/form-models/question';
import { PollService } from 'src/app/services/dashboard-services/poll.service';
import { UiDashboardService } from 'src/app/services/dashboard-services/ui-dashboard.service';
import { AnswerService } from 'src/app/services/form-services/answer.service';
import { QuestionViewModelService } from 'src/app/services/form-services/question-view-model.service';
import { QuestionsService } from 'src/app/services/form-services/questions.service';
import { AccountService } from 'src/app/services/shared-services/account.service';

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.css'],
})
export class FormEditComponent implements OnInit {
  @Output() author!: number;
  questions: Question[] = [];
  questionsToRemove: number[] = [];
  answersToRemove: number[] = [];
  title: string = 'Przykładowy tytuł';
  description: string = 'Przykładowy opis';
  poll?: Poll;
  
  constructor(
    private pollService: PollService,
    private route: ActivatedRoute,
    private questionViewModelService: QuestionViewModelService,
    private questionsService: QuestionsService,
    private answerService: AnswerService,
    private router: Router,
    private accountService: AccountService,
    private uiDashboardService: UiDashboardService
  ) {

    this.accountService.getAuthorId().subscribe({
      // If success
      next: (id) => {
        this.author = id;
        const slug = this.route.snapshot.paramMap.get('slug');

        if (slug !== null) {
          // Get basic information about poll
          this.pollService.getPoll(slug).subscribe((poll) => {
            this.poll = poll;
            this.title = poll.title;
            this.description = poll.description;

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
      },
      // If error (not logged)
      error: () => {
        this.router.navigate(['login']);
      },
    });
  }

  ngOnInit(): void {
  }

  copyQuestion = (question: Question) => {
    this.questions.push({ ...question });
    this.questions[this.questions.length - 1].id = -1;
  };

  removeQuestion = (question: Question) => {
    this.questions = this.questions.filter((q) => q !== question);
    if (question.id !== -1) this.questionsToRemove.push(question.id);
  };

  removeAnswer = (answer: Answer) => {
    if (answer.id !== -1) this.answersToRemove.push(answer.id);
  };

  addNewQuestion = () => {
    this.questions.push(
      new Question(-1, '', [], QuestionType.Checkbox, this.questions.length)
    );
  };

  moveQuestion = (event: { questionMoved: Question; moved: number }) => {
    const index = this.questions.findIndex((q) => q === event.questionMoved);
    this.questions[index + event.moved].position += -event.moved;
    event.questionMoved.position += event.moved;
    this.questions = this.questions.sort((q1, q2) => q1.position - q2.position);
  };

  savePoll = () => {
    if (this.poll === undefined) {
      this.poll = new Poll(
        -1,
        this.title,
        this.description,
        '',
        null,
        null,
        new Date(Date.now()).toISOString(),
        0,
        0,
        Poll.Status.editing,
        this.author
      );
    }
    this.poll.title = this.title;
    this.poll.description = this.description;
    console.log(this.answersToRemove);
    console.log(this.questionsToRemove);
    this.pollService.savePoll(this.poll).subscribe((r) => {
      this.questionsService
        .saveQuestions(this.questions, r.id)
        .subscribe((r) => {
          this.questionsService
            .removeQuestions(this.questionsToRemove)
            .pipe(defaultIfEmpty([]))
            .subscribe((r) => {
              this.answerService
                .removeAnswers(this.answersToRemove)
                .pipe(defaultIfEmpty([]))
                .subscribe((r) => {
                  console.log('finished');
                });
            });
        });
    });
    // Navigate dashboard
    this.router.navigate(['dashboard']);
  };

  navigateBack = () => {
    this.router.navigate(['dashboard']);
  };
}
