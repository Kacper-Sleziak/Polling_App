import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { FormAnswersComponent } from './components/form-components/form-answers/form-answers.component';
import { TextAnswerComponent } from './components/form-components/answers/text-answer/text-answer.component';
import { RadioAnswerComponent } from './components/form-components/answers/radio-answer/radio-answer.component';
import { ShortTextAnswerComponent } from './components/form-components/answers/short-text-answer/short-text-answer.component';
import { PollingFormComponent } from './components/form-components/polling-form/polling-form.component';
import { FormTitleComponent } from './components/form-components/form-title/form-title.component';
import { QuestionComponent } from './components/form-components/question/question.component';
import { AnswerComponent } from './components/form-components/answers/answer/answer.component';
import { CheckboxAnswerComponent } from './components/form-components/answers/checkbox-answer/checkbox-answer.component';
import { ComboboxAnswerComponent } from './components/form-components/answers/combobox-answer/combobox-answer.component';
import { FooterComponent } from './components/shared-components/footer/footer.component';
import { ToolbarComponent } from './components/shared-components/toolbar/toolbar.component';
import { SideNavigatorComponent } from './components/shared-components/side-navigator/side-navigator.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PollsComponent } from './pages/polls/polls.component';
import { CreatePollComponent } from './pages/create-poll/create-poll.component';
import { CardComponent } from './pages/polls/components/card/card.component';
import { CreatePollCardComponent } from './pages/polls/components/create-poll-card/create-poll-card.component';
import { ScaleAnswerComponent } from './components/form-components/answers/scale-answer/scale-answer.component';
import { DeleteDialogComponent } from './pages/polls/components/delete-dialog/delete-dialog.component';
import { FormEditComponent } from './components/form-components/form-edit/form-edit.component';
import { FormTitleEditComponent } from './components/form-components/form-title-edit/form-title-edit.component';
import { QuestionEditComponent } from './components/form-components/question-edit/question-edit.component';
import { FormAnswersEditComponent } from './components/form-components/form-answers-edit/form-answers-edit.component';
import { CheckboxAnswerEditComponent } from './components/form-components/answers-edit/checkbox-answer-edit/checkbox-answer-edit.component';
import { AnswerEditComponent } from './components/form-components/answers-edit/answer-edit/answer-edit.component';
import { ComboboxAnswerEditComponent } from './components/form-components/answers-edit/combobox-answer-edit/combobox-answer-edit.component';
import { ShortTextAnswerEditComponent } from './components/form-components/answers-edit/short-text-answer-edit/short-text-answer-edit.component';
import { TextAnswerEditComponent } from './components/form-components/answers-edit/text-answer-edit/text-answer-edit.component';
import { RadioAnswerEditComponent } from './components/form-components/answers-edit/radio-answer-edit/radio-answer-edit.component';
import { ScaleAnswerEditComponent } from './components/form-components/answers-edit/scale-answer-edit/scale-answer-edit.component';
import { QuestionEditControlsComponent } from './components/form-components/question-edit-controls/question-edit-controls.component';

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
    RadioAnswerComponent,
    ShortTextAnswerComponent,
    FooterComponent,
    ToolbarComponent,
    SideNavigatorComponent,
    DashboardComponent,
    PollsComponent,
    CreatePollComponent,
    CardComponent,
    CreatePollCardComponent,
    ScaleAnswerComponent,
    DeleteDialogComponent,
    FormEditComponent,
    FormTitleEditComponent,
    QuestionEditComponent,
    FormAnswersEditComponent,
    CheckboxAnswerEditComponent,
    AnswerEditComponent,
    ComboboxAnswerEditComponent,
    ShortTextAnswerEditComponent,
    TextAnswerEditComponent,
    RadioAnswerEditComponent,
    ScaleAnswerEditComponent,
    QuestionEditControlsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
