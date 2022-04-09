import { QuestionType } from "./question";

export class Answer{
    id: number = -1;
    answer!: string;
    isChecked: boolean = false;
    result: string = '';

    constructor (id: number, answer: string, type: QuestionType = QuestionType.Checkbox){
        this.id = id;
        this.answer = answer;
        this.result = '';
        if(type===QuestionType.Radio || type===QuestionType.Checkbox){ 
            this.result = 'false';
        }
    }
}