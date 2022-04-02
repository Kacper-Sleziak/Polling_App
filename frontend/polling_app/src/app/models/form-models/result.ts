
export class Result {
    answerId: number;
    options: {optionId: number, content: string}[] = [];

    constructor (answerId: number, options: {optionId: number, content: string}[]) {
        this.answerId = answerId;
        this.options = options;
    }

}