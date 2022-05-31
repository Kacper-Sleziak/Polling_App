import { QuestionType } from "../form-models/question";
import { AnswerStats } from "./answer-stats";


export class QuestionStats {

    questionName: string;
    questionType: QuestionType;
    required: boolean;
    answerCount: number;
    answersStats: AnswerStats[];

    constructor(questionName: string,  questionType: QuestionType, required: boolean, answerCount: number, answersStats: AnswerStats[]){
        this.questionName = questionName;
        this.questionType = questionType;
        this.required = required;
        this.answerCount = answerCount;
        this.answersStats = answersStats;
    }
}