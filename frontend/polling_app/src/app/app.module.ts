// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';

// App component
import { AppComponent } from './app.component';
//
// Form components
import { FormAnswersComponent } from './components/form-components/form-answers/form-answers.component';
import { TextAnswerComponent } from './components/form-components/answers/text-answer/text-answer.component';
import { TrueOrFalseAnswerComponent } from './components/form-components/answers/true-or-false-answer/true-or-false-answer.component';
import { RadioAnswerComponent } from './components/form-components/answers/radio-answer/radio-answer.component';
import { ShortTextAnswerComponent } from './components/form-components/answers/short-text-answer/short-text-answer.component';
import { PollingFormComponent } from './components/form-components/polling-form/polling-form.component';
import { FormTitleComponent } from './components/form-components/form-title/form-title.component';
import { QuestionComponent } from './components/form-components/question/question.component';
import { AnswerComponent } from './components/form-components/answers/answer/answer.component';
import { CheckboxAnswerComponent } from './components/form-components/answers/checkbox-answer/checkbox-answer.component';
import { ComboboxAnswerComponent } from './components/form-components/answers/combobox-answer/combobox-answer.component';
//
//Shared components
import { FooterComponent } from './components/shared-components/footer/footer.component';
import { ToolbarComponent } from './components/shared-components/toolbar/toolbar.component';
import { SideNavigatorComponent } from './components/shared-components/side-navigator/side-navigator.component'
//


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
    RadioAnswerComponent,
    ShortTextAnswerComponent,
    FooterComponent,
    ToolbarComponent,
    SideNavigatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
