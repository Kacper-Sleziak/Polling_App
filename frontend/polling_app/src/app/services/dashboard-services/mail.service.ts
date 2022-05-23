import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { SubscriptionLog } from 'rxjs/internal/testing/SubscriptionLog';
import { EmailMessage } from 'src/app/models/dashboard-models/emailMessage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) { 

  }

  postMail(emailMessage : EmailMessage): Observable<any>{
    return this.http.post<EmailMessage>(`${environment.apiUrl}/mail/`, emailMessage);
  }

}
