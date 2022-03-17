import { Component, OnInit, Output } from '@angular/core';
import { Question } from 'src/app/models/question';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-polling-form',
  templateUrl: './polling-form.component.html',
  styleUrls: ['./polling-form.component.css']
})
export class PollingFormComponent implements OnInit {
  questions: Question[] = [];
  @Output() title: string = 'Przykładowy tytuł';
  @Output() description: string = 'Przykładowy opis';

  constructor(private questionsService: QuestionsService) {}

  ngOnInit(): void {
    this.questionsService.getQuestions().subscribe(questions=>this.questions = questions);
  }

}
