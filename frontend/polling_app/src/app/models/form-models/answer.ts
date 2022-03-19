
export class Answer{
    answer!: string;
    isChecked: boolean = false;
    result: string = '';

    constructor (answer: string){
        this.answer = answer;
    }
}