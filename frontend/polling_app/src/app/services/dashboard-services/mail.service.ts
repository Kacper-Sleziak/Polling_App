import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from 'src/app/models/dashboard-models/email';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) { 

  }

  postMail(email : Email): void{

    this.http.post(`${environment.apiUrl}/mail/`, email).subscribe( response => {});
  }

}
