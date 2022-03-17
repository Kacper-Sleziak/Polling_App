
export class Answer{
    answer!: string;
    isChecked: boolean = false;

    constructor (answer: string){
        this.answer = answer;
    }
}