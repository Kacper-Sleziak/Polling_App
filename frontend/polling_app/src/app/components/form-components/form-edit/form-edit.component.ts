import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/models/form-models/question';
import { PollService } from 'src/app/services/dashboard-services/poll.service';
import { QuestionViewModelService } from 'src/app/services/form-services/question-view-model.service';
import { QuestionsService } from 'src/app/services/form-services/questions.service';

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.css'],
})
export class FormEditComponent implements OnInit {
  questions: Question[] = [];
  title: string = 'Przykładowy tytuł';
  description: string = 'Przykładowy opis';
  constructor(
    private pollService: PollService,
    private route: ActivatedRoute,
    private questionViewModelService: QuestionViewModelService
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug !== null) {
      this.pollService.getPoll(slug).subscribe((poll) => {
        this.title = poll.name;
        this.description = poll.description;
        this.questionViewModelService.loadPollQuestions(poll.id);
        /*this.questionViewModelService
          .onUpdate()
          .subscribe((questions: Question[]) => (this.questions = questions));
        this.questionViewModelService.getQuestions();*/
        this.questions = this.questionViewModelService.getAllQuestions();
      });
    }
  }
}
