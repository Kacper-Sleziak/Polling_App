import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Question } from 'src/app/models/form-models/question';
import { Result } from 'src/app/models/form-models/result';
import { Trigger } from 'src/app/models/form-models/trigger';
import { AnswerService } from './answer.service';
import { QuestionsService } from './questions.service';
import { TriggerService } from './trigger.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionViewModelService {
  questions: Question[] = [];
  questionsViewModel: Question[] = [];
  triggers: Map<number, Trigger[]> = new Map();
  questionResult: Map<Question, Result> = new Map();
  private subject = new Subject<Question[]>();

  constructor(
    private questionsService: QuestionsService,
    private answerService: AnswerService,
    private triggerService: TriggerService
  ) {}

  onUpdate(): Observable<Question[]> {
    return this.subject.asObservable();
  }

  loadPollQuestions(pollId: number) {
    this.subject.next(this.questions);
    this.questionsService.getQuestions(pollId).subscribe((questions) => {
      this.questions.push(...questions);
      for (const question of this.questions) {
        this.answerService
          .getAnswers(question.id)
          .subscribe((answers) => (question.answers = answers));
        this.triggerService.getTriggers(question.id).subscribe((triggers) => {
          this.updateTriggers(triggers);
          this.updateQuestionViewModel(question, triggers);
          if (triggers.length <= 0) {
            this.questionsViewModel.push(question);
          }
        });
      }
    });
  }

  getQuestions() {
    return this.questionsViewModel;
  }

  updateQuestionViewModel(question: Question, triggers: Trigger[]) {
    for (const trigger of triggers) {
      const triggeredQuestion = this.questions.find(
        (q) => q.id === trigger.triggeredQuestionId
      );
      if (triggeredQuestion === undefined) continue;
      const options = this.questionResult.get(question)?.options;
      if (options !== undefined) {
        if (trigger.triggeringAnswer === 'any') {
          if (this.questionResult.get(question) !== undefined) {
            if (
              this.questionsViewModel.find(
                (q) => q.id === triggeredQuestion.id
              ) === undefined
            )
              this.questionsViewModel.push(triggeredQuestion);
          }
        } else {
          for (const option of options) {
            const answer = question.answers.filter(
              (a) => a.id === option.optionId
            )[0];
            if (answer.answer === trigger.triggeringAnswer) {
              if (option.content === 'false') {
                this.hideQuestion(triggeredQuestion);
                break;
              }
              if (
                this.questionsViewModel.find(
                  (q) => q.id === triggeredQuestion.id
                ) === undefined
              ) {
                this.questionsViewModel.push(triggeredQuestion);
              }
              break;
            }
          }
        }
      } else {
        this.hideQuestion(triggeredQuestion);
      }
    }
  }

  hideQuestion(question: Question) {
    console.log(question);
    this.questionsViewModel = this.questionsViewModel.filter(
      (q) => q.id !== question.id
    );
    this.subject.next(this.questionsViewModel);
    this.questionResult.delete(question);
    const triggers = this.triggers.get(question.id);
    if (triggers !== undefined)
      this.updateQuestionViewModel(question, triggers);
  }

  updateTriggers(triggers: Trigger[]) {
    for (const trigger of triggers) {
      if (this.triggers.get(trigger.triggeringQuestionId) === undefined) {
        this.triggers.set(trigger.triggeringQuestionId, []);
      }
      this.triggers.get(trigger.triggeringQuestionId)?.push(trigger);
    }
  }

  updateAnswer = (question: Question, result: Result) => {
    this.questionResult.set(question, result);
    const triggers = this.triggers.get(question.id);
    if (triggers !== undefined)
      this.updateQuestionViewModel(question, triggers);
  };

  getResultInJSON = () => {
    let arr = [];
    for (const key of this.questionResult.keys()) {
      let res = {
        questionId: key.id,
        question: key.question,
        type: key.type,
        results: this.questionResult.get(key),
      };
      arr.push(res);
    }
    return JSON.stringify(arr);
  };
}
