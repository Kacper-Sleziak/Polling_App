import { Answer } from './answer';

export enum QuestionType {
  Checkbox,
  Combobox,
  LongText,
  ShortText,
  TrueFalse,
  Radio,
  Scale5,
  Scale10,
}

export class Question {
  id: number = -1;
  position: number = 0;
  question!: string;
  answers: Answer[] = [];
  type: QuestionType;

  constructor(
    id: number,
    question: string,
    answers: Answer[],
    type: QuestionType = QuestionType.Checkbox,
    position: number = 0
  ) {
    this.id = id;
    this.question = question;
    this.answers = answers;
    this.type = type;
    this.position = position;
  }
}
