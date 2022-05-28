import { Answer } from "../form-models/answer";
import { QuestionType } from "../form-models/question";
import { AnswerStats } from "./answer-stats";


export class QuestionStats {

    question: string;
    answersStats: AnswerStats[];

    // id: number = -1;
    // position: number = 0;
    // question!: string;
    // answers: Answer[] = [];
    // type: QuestionType;



    constructor(question: string, answersStats: AnswerStats[]){
        this.question = question;
        this.answersStats = answersStats;
    }
}