import { Answer } from "./answer";

export enum QuestionType {
    Checkbox,
    Combobox,
    LongText,
    ShortText,
    TrueFalse,
    Radio
}

export class Question{
    question!: string;
    answers: Answer[] = [];
    type: QuestionType;

    constructor(question: string, answers: Answer[], type: QuestionType = QuestionType.Checkbox) {
        this.question = question;
        this.answers = answers;
        this.type = type;
    }
  
}