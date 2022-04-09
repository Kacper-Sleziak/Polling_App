import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/models/form-models/question';
import { Result } from 'src/app/models/form-models/result';
import { PollService } from 'src/app/services/dashboard-services/poll.service';
import { AnswerService } from 'src/app/services/form-services/answer.service';
import { QuestionsService } from 'src/app/services/form-services/questions.service';

@Component({
  selector: 'app-polling-form',
  templateUrl: './polling-form.component.html',
  styleUrls: ['./polling-form.component.css']
})
export class PollingFormComponent implements OnInit {
  questions: Question[] = [];
  title: string = 'Przykładowy tytuł';
  description: string = 'Przykładowy opis';
  questionResult: Map<Question, Result> = new Map();

  constructor(private questionsService: QuestionsService, private pollService: PollService, private answerService: AnswerService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    const pollId = 1;
    if(slug !== null){
      this.pollService.getPoll(slug).subscribe(poll=>{
        this.title = poll.name;
        this.description = poll.description;
        this.questionsService.getQuestions(poll.id).subscribe(
          questions=>{
            this.questions = questions;
            for (const question of this.questions) {
              this.answerService.getAnswers(question.id).subscribe(answers=>question.answers = answers);
            }
          }
        );
      });
    }
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
    //console.log(this.getResultInJSON());
    console.log(this.questionResult);
    /*fetch('http://127.0.0.1:8000/polls/1/')
    .then(response => response.json())
    .then(data => console.log(data));*/
  }

}
