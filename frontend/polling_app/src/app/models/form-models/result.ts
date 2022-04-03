
export class Result {
    options: {optionId: number, content: string}[] = [];

    constructor (options: {optionId: number, content: string}[]) {
        this.options = options;
    }

}