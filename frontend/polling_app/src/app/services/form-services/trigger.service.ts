import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Trigger } from 'src/app/models/form-models/trigger';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TriggerService {

  constructor(private http: HttpClient) { }

  getTriggers (questionId: number): Observable<Trigger[]>{
    return this.http.get(`${environment.apiUrl}/triggers/question/${questionId}`)
    .pipe(
        map(
        (result: any)=>{
            if(result===null) return [];
            const triggers: Trigger [] = [];
            for (const trigger of result) {
              triggers.push(
                {
                id: trigger.id, 
                triggeringAnswer: trigger.triggering_answer,
                triggeringQuestionId: trigger.triggering_question,
                triggeredQuestionId: trigger.triggered_question
                });
            }
            return triggers;
        })
    );
  }
}
