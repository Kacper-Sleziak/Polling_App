import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Poll } from '../../models/dashboard-models/poll';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PollService {
  constructor(private http: HttpClient) {}

  getPolls(author: number): Observable<Poll[]>{
    let polls: Poll[] = [];

    this.http
      .get<any[]>(`${environment.apiUrl}/polls/author/${author}`)
      .subscribe((result: any[]) => {
        if(result !== null){
          
          result.forEach((jsonPoll: any) => {
            polls.push(
              new Poll(
                jsonPoll.id,
                jsonPoll.title,
                jsonPoll.description,
                jsonPoll.slug,
                jsonPoll.start_date,
                jsonPoll.end_date,
                jsonPoll.create_date,
                jsonPoll.filling,
                jsonPoll.sent,
                jsonPoll.status,
                jsonPoll.author
              )
            );
          });
        }
      });
    return of(polls);
  }

  deletePoll(slug: string): void {
    // console.log(`${environment.apiUrl}/polls/${slug}/`));
    this.http
      .delete(`${environment.apiUrl}/polls/${slug}/`)
      .subscribe((response) => {});
  }

  statusChange(poll: Poll): void {
    // Update status and dates
    let date = new Date().toJSON();

    if (poll.status === Poll.Status.open) {
      poll.status = Poll.Status.close;
      if (poll.startDate !== null) {
        poll.endDate = date;
      }
    } else {
      poll.status = Poll.Status.open;
      poll.startDate = date;
      poll.endDate = null;
    }
    this.putPoll(poll).subscribe();
  }

  putPoll(poll: Poll): Observable<Poll> {
    return this.http.put<Poll>(`${environment.apiUrl}/polls/${poll.slug}/`, {
      title: poll.title,
      description: poll.description,
      start_date: poll.startDate,
      end_date: poll.endDate,
      filling: poll.filled,
      sent: poll.sent,
      status: poll.status,
      author: poll.author,
    });
  }

  postPoll(poll: Poll): Observable<Poll> {
    return this.http.post<Poll>(`${environment.apiUrl}/polls/`, {
      title: poll.title,
      description: poll.description,
      start_date: poll.startDate,
      end_date: poll.endDate,
      filling: poll.filled,
      sent: poll.sent,
      status: poll.status,
      author: poll.author,
    });
  }

  getPoll(slug: string): Observable<Poll> {
    return this.http.get(`${environment.apiUrl}/polls/${slug}`).pipe(
      map((result: any) => {
        return new Poll(
          result.id,
          result.title,
          result.description,
          result.slug,
          result.start_date,
          result.end_date,
          result.create_date,
          result.filling,
          result.sent,
          result.status,
          result.author
        );
      })
    );
  }

  savePoll(poll: Poll): Observable<Poll> {
    if (poll.id === -1) {
      return this.postPoll(poll);
    } else {
      return this.putPoll(poll);
    }
  }
}
