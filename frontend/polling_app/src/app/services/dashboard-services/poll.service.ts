import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Poll } from '../../models/dashboard-models/poll'

@Injectable({
  providedIn: 'root'
})
export class PollService {

  polls: Poll[];

  constructor(private http: HttpClient) { 
    
    this.polls = [
      {
        "id": 250,
        "name": "Jakość usług - marzec 2022",
        "startDate": "17.03.2022 13:00:21",
        "endDate": "17.04.2022 13:00:21",
        "filled": 0,
        "sent": 0,
        "status": "oczekująca"
      },
      {
          "id": 23,
          "name": "Ocena zmian",
          "startDate": "11.03.2021 12:11:35",
          "endDate": "14.03.2021 12:11:35",
          "filled": 100,
          "sent": 243,
          "status": "zakończona"
      },
      {
          "id": 33,
          "name": "Jakość usług",
          "startDate": "14.03.2021 12:11:35",
          "endDate": "20.03.2022 12:11:35",
          "filled": 33,
          "sent": 50,
          "status": "wstrzymana" 
      },
      {
          "id": 34,
          "name": "Prosty formularz",
          "startDate": "12.03.2022 12:11:35",
          "endDate": "20.03.2022 12:11:35",
          "filled": 14,
          "sent": 20,
          "status": "aktywna"
      },
      {
          "id": 35,
          "name": "Jakość usług",
          "startDate": "12.03.2022 13:00:21",
          "endDate": "12.04.2022 13:00:21",
          "filled": 0,
          "sent": 0,
          "status": "edytowana"
      },
      {
          "id": 54,
          "name": "Prosty formularz",
          "startDate": "17.03.2022 13:00:21",
          "endDate": "17.04.2022 13:00:21",
          "filled": 0,
          "sent": 0,
          "status": "oczekująca"
      },
      {
          "id": 23,
          "name": "Ocena zmian",
          "startDate": "11.03.2021 12:11:35",
          "endDate": "14.03.2021 12:11:35",
          "filled": 100,
          "sent": 243,
          "status": "zakończona"
      },
      {
          "id": 23,
          "name": "Ocena zmian",
          "startDate": "11.03.2021 12:11:35",
          "endDate": "14.03.2021 12:11:35",
          "filled": 100,
          "sent": 243,
          "status": "zakończona"
      },
      {
          "id": 33,
          "name": "Jakość usług",
          "startDate": "14.03.2021 12:11:35",
          "endDate": "20.03.2022 12:11:35",
          "filled": 33,
          "sent": 50,
          "status": "wstrzymana" 
      },
      {
          "id": 34,
          "name": "Prosty formularz",
          "startDate": "12.03.2022 12:11:35",
          "endDate": "20.03.2022 12:11:35",
          "filled": 14,
          "sent": 20,
          "status": "aktywna"
      },
      {
          "id": 35,
          "name": "Jakość usług",
          "startDate": "12.03.2022 13:00:21",
          "endDate": "12.04.2022 13:00:21",
          "filled": 12,
          "sent": 100,
          "status": "aktywna"
      },
      {
          "id": 54,
          "name": "Prosty formularz",
          "startDate": "17.03.2022 13:00:21",
          "endDate": "17.04.2022 13:00:21",
          "filled": 0,
          "sent": 0,
          "status": "oczekująca"
      },
      {
          "id": 23,
          "name": "Aktywna",
          "startDate": "11.03.2021 12:11:35",
          "endDate": "14.03.2021 12:11:35",
          "filled": 100,
          "sent": 243,
          "status": "zakończona"
      },
      {
          "id": 33,
          "name": "Jakość usług",
          "startDate": "14.03.2021 12:11:35",
          "endDate": "20.03.2022 12:11:35",
          "filled": 33,
          "sent": 50,
          "status": "wstrzymana" 
      },
      {
          "id": 34,
          "name": "Prosty formularz",
          "startDate": "12.03.2022 12:11:35",
          "endDate": "20.03.2022 12:11:35",
          "filled": 14,
          "sent": 20,
          "status": "aktywna"
      },
      {
          "id": 35,
          "name": "Jakość usług",
          "startDate": "12.03.2022 13:00:21",
          "endDate": "12.04.2022 13:00:21",
          "filled": 12,
          "sent": 100,
          "status": "aktywna"
      },
      {
          "id": 33,
          "name": "Jakość usług",
          "startDate": "14.03.2021 12:11:35",
          "endDate": "20.03.2022 12:11:35",
          "filled": 33,
          "sent": 50,
          "status": "wstrzymana" 
      },
      {
          "id": 34,
          "name": "Prosty formularz",
          "startDate": "12.03.2022 12:11:35",
          "endDate": "20.03.2022 12:11:35",
          "filled": 14,
          "sent": 20,
          "status": "aktywna"
      },
      {
          "id": 35,
          "name": "Jakość usług",
          "startDate": "12.03.2022 13:00:21",
          "endDate": "12.04.2022 13:00:21",
          "filled": 12,
          "sent": 100,
          "status": "aktywna"
      },
      {
          "id": 250,
          "name": "Jakość usług - marzec 2022",
          "startDate": "17.03.2022 13:00:21",
          "endDate": "17.04.2022 13:00:21",
          "filled": 0,
          "sent": 0,
          "status": "oczekująca"
      }

    ];
  }

  getPolls(): Observable<Poll[]>{
    return of(this.polls);
  }

  deletePoll(id : number): void{
      console.log(this.apiURL.concat(`/polls/${id}`));
      console.log(environment.apiUrl.concat(`/polls/${id}`));
    // this.http.delete(this.apiURL.concat(`/polls/${id}`));
  }
}
