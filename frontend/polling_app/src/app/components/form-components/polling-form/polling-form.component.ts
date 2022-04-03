import { Component, OnInit, Output } from '@angular/core';
import { Question } from 'src/app/models/form-models/question';
import { Result } from 'src/app/models/form-models/result';
import { QuestionsService } from 'src/app/services/form-services/questions.service';

@Component({
  selector: 'app-polling-form',
  templateUrl: './polling-form.component.html',
  styleUrls: ['./polling-form.component.css']
})
export class PollingFormComponent implements OnInit {
  questions: Question[] = [];
  @Output() title: string = 'Przykładowy tytuł';
  @Output() description: string = 'Przykładowy opis';
  questionResult: Map<Question, Result> = new Map();

  constructor(private questionsService: QuestionsService) {}

  ngOnInit(): void {
    this.questionsService.getQuestions().subscribe(questions=>this.questions = questions);
  }

  updateAnswer = (question: Question, result: Result) => {
    this.questionResult.set(question, result);
  }

  getResultInJSON = () => {
    let arr = [];
    for (const key of this.questionResult.keys()) {
      let res = {
      questionId: key.id,
      question: key.question,
      type: key.type,
      results: this.questionResult.get(key)};
      arr.push(res);
    }
    return JSON.stringify(arr);
  }

  handleSendAnswer = () => {
    console.log(this.getResultInJSON());
  }

}
