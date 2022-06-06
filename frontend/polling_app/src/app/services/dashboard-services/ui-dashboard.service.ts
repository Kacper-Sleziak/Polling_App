import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Poll } from 'src/app/models/dashboard-models/poll';
import { AccountService } from '../shared-services/account.service';
import { PollService } from './poll.service';


@Injectable({
  providedIn: 'root'
})
export class UiDashboardService {

  // allPolls: Poll[] = [];
  // displayingPolls: Poll[] = [];
  private subjectDeletePoll = new Subject<Poll>();
  private subjectCopyPoll = new Subject<Poll>();

  constructor(  private pollService: PollService,
                private accountService: AccountService,
                private router: Router) { 
    // // Author id will be returned when user is logged
    // this.accountService.getAuthorId().subscribe({
    //   next: (authorId) =>{
    //     // Fetch polls via API
    //     this.pollService.getPolls(authorId).subscribe({
    //       // If success
    //       next: (polls: Poll[]) =>{
    //         this.allPolls = polls;
    //         this.displayingPolls = polls;
    //       },
    //       error: (err) =>{
    //         console.log(err);
    //       }
    //     });
    //   },
    //   // If error - no one is logged -> redirect to login
    //   error: err => {
    //     this.router.navigate(['login']);
    //   }
    // })
  }
  deletePoll(poll: Poll){
    this.subjectDeletePoll.next(poll);
  }

  copyPoll(poll: Poll){
    this.subjectCopyPoll.next(poll);
  }

  onDeletePoll(): Observable<Poll>{
    return this.subjectDeletePoll.asObservable();
  }

  onCopyPoll(): Observable<Poll>{
    return this.subjectCopyPoll.asObservable();
  }


  // onAllPollsChange(): Observable<Poll[]>{
  //   return this.subjectAllPolls.asObservable();
  // }

  // onDisplayingPollsChange(): Observable<Poll[]>{
  //   return this.subjectDisplayingPolls.asObservable();
  // }

  // addPoll(poll : Poll): void{
    
  //   // Append arrays
  //   this.allPolls.push(poll);
  //   this.displayingPolls.push(poll);

  //   //Notify changes
  //   this.subjectAllPolls.next(this.allPolls);
  //   this.subjectDisplayingPolls.next(this.displayingPolls);
  // }

  // deletePoll(pollId: number): void{

  //   // Filter displaying polls
  //   this.displayingPolls = this.displayingPolls.filter((poll) =>{

  //     if(poll.id === pollId) return false;
  //     else return true;
  //   })

  //   // Filter all polls 
  //   this.allPolls = this.allPolls.filter((poll) =>{

  //     if(poll.id === pollId) return false;
  //     else return true;
  //   })

  //   // Notify changes
  //   this.subjectAllPolls.next(this.allPolls);
  //   this.subjectDisplayingPolls.next(this.displayingPolls);
  // }

  // setAllPolls(polls: Poll[]): void{
  //   this.allPolls = polls;
  //   // Notify changes
  //   this.subjectAllPolls.next(this.allPolls);
  // }

  // setDisplayingPolls(polls: Poll[]): void{
  //   this.displayingPolls = polls;
  //   // Notify changes
  //   this.subjectDisplayingPolls.next(this.displayingPolls);
  // }

  // getAllPolls(): Poll[]{    
  //   return this.allPolls;
  // }

  // getDisplayingPolls(): Poll[]{
  //   return this.displayingPolls;
  // }
}
