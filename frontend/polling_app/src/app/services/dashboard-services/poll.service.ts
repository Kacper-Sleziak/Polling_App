import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Poll } from '../../models/dashboard-models/poll'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  polls: Poll[];

  constructor(private http: HttpClient) { 
    

    this.polls = [
      new Poll(2, "Jakość usług - marzec 2022", "", "asdzc", null , null, "2021-03-11T12:11:35.000Z", 0, 0, 2 ),
      new Poll(23, "Ocena zmian", "", "asdzasdc", "2021-03-11T12:11:35.000Z" , null, "2021-03-11T12:11:35.000Z", 100, 243, 0),
      new Poll(33, "Jakość usług", "", "asdzasdc", "2021-03-14T12:11:35.000Z" , "2021-03-20T12:11:35.000Z", "2021-03-11T12:11:35.000Z", 33, 50, 1),
      new Poll(4, "Prosty formularz", "", "asdzasdc", "2021-03-12T12:11:35.000Z" , "2021-03-20T12:11:35.000Z", "2021-03-11T12:11:35.000Z", 14, 20, 1),
      new Poll(1, "Jakość usług", "", "asdzasdc", null , null, "2021-03-11T12:11:35.000Z", 0, 0, 2),
      new Poll(7, "Prosty formularz", "", "asdzasdc", null , null, "2021-03-11T12:11:35.000Z", 0, 0, 2),
      new Poll(101, "Ocena zmian", "", "asdzasdc", "2021-03-11T12:11:35.000Z" , null, "2021-03-09T12:11:35.000Z", 100, 243, 0),
      new Poll(57, "Ocena zmian", "", "asdzasdc", "2021-03-11T12:11:35.000Z" , null, "2021-03-09T12:11:35.000Z", 100, 250, 0),
    ];
  }

 

  getPolls(): Observable<Poll[]>{
    return of(this.polls);
  }

  deletePoll(id : number): void{
      this.polls = this.polls.filter((poll) => {
        if(poll.id === id) return false;
        return true; 
      });
      
      console.log(environment.apiUrl.concat(`/polls/${id}`));
    // this.http.delete(this.apiURL.concat(`/polls/${id}`));
  }

  statusChange(poll : Poll): void{
    // Update status and dates
    let date = new Date().toJSON();

    if(poll.status === Poll.Status.open){
      poll.status = Poll.Status.close;
      if(poll.startDate !== null){
        poll.endDate = date;
      }
    }
    else{
      poll.status = Poll.Status.open;
      poll.startDate = date;
      poll.endDate = null;
    }
    this.putPoll(poll);
  }

  putPoll(poll : Poll): void{
      // this.http.put(`${environment.apiUrl}/polls/${poll.id}`, poll);
  }

  getPoll(slug: string): Observable<Poll>{
    return this.http.get(`${environment.apiUrl}/polls/${slug}`)
    .pipe(
        map(
        (result: any)=>{
            return new Poll(result.id, result.title, result.description, result.slug , result.start_date, result.end_date, result.create_date, result.filling, result.sent, result.status);
        })
    );
  }
}
