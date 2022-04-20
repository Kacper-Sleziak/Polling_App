import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Poll } from 'src/app/models/dashboard-models/poll';

@Injectable({
  providedIn: 'root'
})
export class UiPollsService {

  private displayingPolls : Poll[] = [];
  private subject = new Subject<any>();

  constructor() { }

  setDisplayingPolls(polls : Poll[]){
    this.displayingPolls = polls;
    this.subject.next(this.displayingPolls);
  }

  onStatusFilterChange(): Observable<any> {
    return this.subject.asObservable();
  }

}
