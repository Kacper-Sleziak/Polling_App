
import { Poll } from "../dashboard-models/poll";
import { QuestionStats } from "./question-stats";

export class PollResults {

    poll : Poll;
    questionsStats: QuestionStats[];

    constructor(poll: Poll, questionsStats: QuestionStats[]){
        this.poll = poll;
        this.questionsStats = questionsStats;
    }
}