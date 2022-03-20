import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PollingFormComponent } from './components/form-components/polling-form/polling-form.component';
import { FormTitleComponent } from './components/form-components/form-title/form-title.component';
import { QuestionComponent } from './components/form-components/question/question.component';
import { AnswerComponent } from './components/form-components/answers/answer/answer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card'
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio'
import { CheckboxAnswerComponent } from './components/form-components/answers/checkbox-answer/checkbox-answer.component';
import { ComboboxAnswerComponent } from './components/form-components/answers/combobox-answer/combobox-answer.component';
import { FormAnswersComponent } from './components/form-components/form-answers/form-answers.component';
import { TextAnswerComponent } from './components/form-components/answers/text-answer/text-answer.component';
import { TrueOrFalseAnswerComponent } from './components/form-components/answers/true-or-false-answer/true-or-false-answer.component';
import { RadioAnswerComponent } from './components/form-components/answers/radio-answer/radio-answer.component'


const appRoutes: Routes = [{
  path: 'form', component: PollingFormComponent
  },
]

@NgModule({
  declarations: [
    AppComponent,
    PollingFormComponent,
    FormTitleComponent,
    QuestionComponent,
    AnswerComponent,
    CheckboxAnswerComponent,
    ComboboxAnswerComponent,
    FormAnswersComponent,
    TextAnswerComponent,
    TrueOrFalseAnswerComponent,
    RadioAnswerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    BrowserAnimationsModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
