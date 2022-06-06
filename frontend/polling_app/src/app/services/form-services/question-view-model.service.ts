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

  loadPollQuestions(pollId: number): Observable<Question[]> {

      return new Observable<Question[]>( subscriber => {
        this.questionsService.getQuestions(pollId).subscribe({
          // If success
          next: (questions) => {
            // Sort and assign questions
            this.questions = [...questions.sort((a, b) => a.position - b.position)];
            this.loadQuestionsData(this.questions);
            this.questionsViewModel = this.questions;
            // Inform that data have been changed
            this.subject.next(this.questions);
            // Notify that data are ready
            subscriber.next(this.questions);
          },
          // If error
          error: (err) => {
            // Transfer errors
            subscriber.error(err);
          }
        })
      });
  }

  loadQuestionsData = (questions: Question[]) => {
    for (const question of questions) {
      this.loadAnswers(question);
      // this.loadTriggers(question);
    }
  };

  loadAnswers = (question: Question) => {
    // Get possible answers for question 
    this.answerService
      .getAnswers(question.id)
      .subscribe((answers) => (question.answers = answers));
  };


  loadTriggers = (question: Question) => {
    this.triggerService.getTriggers(question.id).subscribe((triggers) => {
      this.updateTriggers(triggers);
      this.updateQuestionViewModel(question, triggers);
      if (triggers.length <= 0) {
        this.questionsViewModel.push(question);
      }
    });
  };

  getQuestions() {
    return this.questionsViewModel;
  }

  loadQuestions() {
    this.subject.next(this.questions.sort((a, b) => a.position - b.position));
  }

  getTriggeredQuestion(trigger: Trigger) {
    return this.questions.find((q) => q.id === trigger.triggeredQuestionId);
  }

  checkIfTriggerFulfilled(question: Question, trigger: Trigger): boolean {
    const options = this.questionResult.get(question)?.options;
    if (options !== undefined) {
      if (trigger.triggeringAnswer === 'any') {
        return this.questionResult.get(question) !== undefined;
      } else {
        for (const option of options) {
          const answer = question.answers.filter(
            (a) => a.id === option.optionId
          )[0];
          return (
            answer.answer === trigger.triggeringAnswer &&
            option.content !== 'false'
          );
        }
      }
    }
    return false;
  }

  updateQuestionViewModel(question: Question, triggers: Trigger[]) {
    for (const trigger of triggers) {
      const triggeredQuestion = this.getTriggeredQuestion(trigger);
      if (triggeredQuestion === undefined) continue;
      const triggered = this.checkIfTriggerFulfilled(question, trigger);
      if (triggered) {
        if (
          this.questionsViewModel.find((q) => q.id === triggeredQuestion.id) ===
          undefined
        ) {
          this.questionsViewModel.push(triggeredQuestion);
        }
      } else {
        this.hideQuestion(triggeredQuestion);
      }
    }
    this.questionsViewModel = this.questionsViewModel.sort(
      (a, b) => a.position - b.position
    );
    this.subject.next(this.questionsViewModel);
  }

  hideQuestion(question: Question) {
    this.questionsViewModel = this.questionsViewModel
      .filter((q) => q.id !== question.id)
      .sort((a, b) => a.position - b.position);
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

  getResults = () => {
    return this.questionResult;
  };

  getAllQuestions = () => {
    return this.questions;
  };
}
