import { QuestionType } from "./question";

export class Answer{
    answer!: string;
    isChecked: boolean = false;
    result: string = '';

    constructor (answer: string, type: QuestionType = QuestionType.Checkbox){
        this.answer = answer;
        this.result = '';
        if(type===QuestionType.Radio){ 
            this.result = 'false';
        }
    }
}