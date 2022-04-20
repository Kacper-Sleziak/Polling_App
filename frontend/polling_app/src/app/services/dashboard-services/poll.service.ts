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
      {
        "id": 2,
        "name": "Jakość usług - marzec 2022",
        "description": "",
        "startDate": "17.03.2022 13:00:21",
        "endDate": "17.04.2022 13:00:21",
        "filled": 0,
        "sent": 0,
        "status": "editing"
      },
      {
          "id": 23,
          "name": "Ocena zmian",
          "description": "",
          "startDate": "11.03.2021 12:11:35",
          "endDate": "14.03.2021 12:11:35",
          "filled": 100,
          "sent": 243,
          "status": "open"
      },
      {
          "id": 33,
          "name": "Jakość usług",
          "description": "",
          "startDate": "14.03.2021 12:11:35",
          "endDate": "20.03.2022 12:11:35",
          "filled": 33,
          "sent": 50,
          "status": "close" 
      },
      {
          "id": 4,
          "name": "Prosty formularz",
          "description": "",
          "startDate": "12.03.2022 12:11:35",
          "endDate": "20.03.2022 12:11:35",
          "filled": 14,
          "sent": 20,
          "status": "close"
      },
      {
          "id": 1,
          "name": "Jakość usług",
          "description": "",
          "startDate": "12.03.2022 13:00:21",
          "endDate": "12.04.2022 13:00:21",
          "filled": 0,
          "sent": 0,
          "status": "editing"
      },
      {
          "id": 7,
          "name": "Prosty formularz",
          "description": "",
          "startDate": null,
          "endDate": null,
          "filled": 0,
          "sent": 0,
          "status": "close"
      },
      {
          "id": 101,
          "name": "Ocena zmian",
          "description": "",
          "startDate": "11.03.2021 12:11:35",
          "endDate": "14.03.2021 12:11:35",
          "filled": 100,
          "sent": 243,
          "status": "open"
      },
      {
          "id": 57,
          "name": "Ocena zmian",
          "description": "",
          "startDate": "11.03.2021 12:11:35",
          "endDate": "14.03.2021 12:11:35",
          "filled": 100,
          "sent": 243,
          "status": "open"
      }
    ];
  }

 

  getPolls(): Observable<Poll[]>{
    return of(this.polls);
  }

  deletePoll(id : number): void{
      console.log(environment.apiUrl.concat(`/polls/${id}`));
    // this.http.delete(this.apiURL.concat(`/polls/${id}`));
  }

  statusChange(poll : Poll): void{
    // Update status and dates
    let date = new Date().toJSON();

    if(poll.status === 'open'){
      poll.status = 'close';
      if(poll.startDate !== null){
        poll.endDate = date;
      }
    }
    else{
      poll.status = 'open';
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
            return new Poll(result.id, result.title, result.description, result.start_date, result.end_date, result.filling, result.sent, result.status);
        })
    );
  }
}
