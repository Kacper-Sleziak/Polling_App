import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PollResults } from 'src/app/models/results/poll-results';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  constructor(private http: HttpClient) { }

  getResults(slug: string): Observable<any>{

    return this.http.get<any>(`${environment.apiUrl}/answers/poll_answers_by_slug/${slug}`)
  }
}


