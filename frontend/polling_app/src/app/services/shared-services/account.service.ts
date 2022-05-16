import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { 
    // Check local storage
    if(localStorage.getItem('authorId')){
      this.authorId = JSON.parse(localStorage.getItem('authorId')!);
    }
  }

  private authorId : number = -1; 
  
  getAuthorId() : Observable<number> {
    return new Observable<number>( subscriber => {
      if(this.authorId === -1){
        subscriber.error('No one is logged in!');
      }
      subscriber.next(this.authorId);
    });
  }

  setAuthorId(authorId : number) : void {
    this.authorId = authorId;
    localStorage.setItem('authorId', JSON.stringify(authorId));
  } 

  postLogin(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/account/login`, {'email': email, 'password': password})
  } 

  postRegister(companyName: string, email: string, password: string, password2: string): Observable<any>{
    return this.http.post(`${environment.apiUrl}/account/register`, { 'company_name': companyName ,'email': email, 'password': password, 'password2': password2})
  }

  logoutAccount(): Observable<any>{

    localStorage.setItem('authorId', JSON.stringify(-1));
    this.authorId = -1;
    return new Observable(subscriber => subscriber.next()); 
  }

}
