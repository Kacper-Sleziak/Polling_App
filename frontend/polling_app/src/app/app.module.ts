
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
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
import { FooterComponent } from './components/shared-components/footer/footer.component';
import { ToolbarComponent } from './components/shared-components/toolbar/toolbar.component';
import { SideNavigatorComponent } from './components/shared-components/side-navigator/side-navigator.component';
import { CardComponent } from './pages/dashboard/components/card/card.component';
import { CreatePollCardComponent } from './pages/dashboard/components/create-poll-card/create-poll-card.component'
import { ScaleAnswerComponent } from './components/form-components/answers/scale-answer/scale-answer.component';
import { DeleteDialogComponent } from './pages/dashboard/components/dialogs/delete-dialog/delete-dialog.component';
import { StatusFilterComponent } from './pages/dashboard/components/status-filter/status-filter.component';
import { PollsTableComponent } from './pages/dashboard/components/polls-table/polls-table.component';
import { PollsAsCardsComponent } from './pages/dashboard/components/polls-as-cards/polls-as-cards.component';
import { OpenEditingPollDialogComponent } from './pages/dashboard/components/dialogs/open-editing-poll-dialog/open-editing-poll-dialog.component';
import { CloseOpenedPollDialogComponent } from './pages/dashboard/components/dialogs/close-opened-poll-dialog/close-opened-poll-dialog.component';
import { OpenClosedPollDialogComponent } from './pages/dashboard/components/dialogs/open-closed-poll-dialog/open-closed-poll-dialog.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PollService } from './services/dashboard-services/poll.service';




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
    SideNavigatorComponent,
    CardComponent,
    CreatePollCardComponent,
    ScaleAnswerComponent,
    DeleteDialogComponent,
    StatusFilterComponent,
    PollsTableComponent,
    PollsAsCardsComponent,
    OpenEditingPollDialogComponent,
    CloseOpenedPollDialogComponent,
    OpenClosedPollDialogComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    PollService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
