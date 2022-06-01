import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Poll } from 'src/app/models/dashboard-models/poll';

@Injectable({
  providedIn: 'root'
})
export class UiPollsService {

  private displayingPolls: Poll[] = [];
  private subject = new Subject<Poll[]>();

  constructor() { 
  }

  setDisplayingPolls(polls : Poll[]): void{
    this.displayingPolls = polls;
    this.subject.next(this.displayingPolls);
  }

  getDisplayingPolls():  Poll[]{
    return [...this.displayingPolls];
  }

  addPoll(poll : Poll){
    this.displayingPolls.unshift(poll);
    this.subject.next(this.displayingPolls);
  }

  deletePoll(pollId: number){
    
    this.displayingPolls = this.displayingPolls.filter((poll) =>{
      if(poll.id === pollId) return false;
      else{
        return true;
      }
    })
    this.subject.next(this.displayingPolls);

  }

  onStatusFilterChange(): Observable<Poll[]> {
    return this.subject.asObservable();
  }

}
