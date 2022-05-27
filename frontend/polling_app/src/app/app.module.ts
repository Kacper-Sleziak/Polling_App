import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { FormAnswersComponent } from './pages/polling-form/components/form-answers/form-answers.component';
import { TextAnswerComponent } from './pages/polling-form/components/answers/text-answer/text-answer.component';
import { RadioAnswerComponent } from './pages/polling-form/components/answers/radio-answer/radio-answer.component';
import { ShortTextAnswerComponent } from './pages/polling-form/components/answers/short-text-answer/short-text-answer.component';
import { PollingFormComponent } from './pages/polling-form/polling-form.component';
import { FormTitleComponent } from './pages/polling-form/components/form-title/form-title.component';
import { QuestionComponent } from './pages/polling-form/components/question/question.component';
import { AnswerComponent } from './pages/polling-form/components/answers/answer/answer.component';
import { CheckboxAnswerComponent } from './pages/polling-form/components/answers/checkbox-answer/checkbox-answer.component';
import { ComboboxAnswerComponent } from './pages/polling-form/components/answers/combobox-answer/combobox-answer.component';
import { FooterComponent } from './components/shared-components/footer/footer.component';
import { ToolbarComponent } from './components/shared-components/toolbar/toolbar.component';
import { SideNavigatorComponent } from './components/shared-components/side-navigator/side-navigator.component';
import { FormEditComponent } from './pages/form-edit/form-edit.component';
import { FormTitleEditComponent } from './pages/form-edit/components/form-title-edit/form-title-edit.component';
import { QuestionEditComponent } from './pages/form-edit/components/question-edit/question-edit.component';
import { FormAnswersEditComponent } from './pages/form-edit/components/form-answers-edit/form-answers-edit.component';
import { CheckboxAnswerEditComponent } from './pages/form-edit/components/answers-edit/checkbox-answer-edit/checkbox-answer-edit.component';
import { AnswerEditComponent } from './pages/form-edit/components/answers-edit/answer-edit/answer-edit.component';
import { ComboboxAnswerEditComponent } from './pages/form-edit/components/answers-edit/combobox-answer-edit/combobox-answer-edit.component';
import { ShortTextAnswerEditComponent } from './pages/form-edit/components/answers-edit/short-text-answer-edit/short-text-answer-edit.component';
import { TextAnswerEditComponent } from './pages/form-edit/components/answers-edit/text-answer-edit/text-answer-edit.component';
import { RadioAnswerEditComponent } from './pages/form-edit/components/answers-edit/radio-answer-edit/radio-answer-edit.component';
import { ScaleAnswerEditComponent } from './pages/form-edit/components/answers-edit/scale-answer-edit/scale-answer-edit.component';
import { QuestionEditControlsComponent } from './pages/form-edit/components/question-edit-controls/question-edit-controls.component';
import { CardComponent } from './pages/dashboard/components/card/card.component';
import { CreatePollCardComponent } from './pages/dashboard/components/create-poll-card/create-poll-card.component';
import { ScaleAnswerComponent } from './pages/polling-form/components/answers/scale-answer/scale-answer.component';
import { DeleteDialogComponent } from './pages/dashboard/components/dialogs/delete-dialog/delete-dialog.component';
import { StatusFilterComponent } from './pages/dashboard/components/status-filter/status-filter.component';
import { PollsTableComponent } from './pages/dashboard/components/polls-table/polls-table.component';
import { PollsAsCardsComponent } from './pages/dashboard/components/polls-as-cards/polls-as-cards.component';
import { OpenEditingPollDialogComponent } from './pages/dashboard/components/dialogs/open-editing-poll-dialog/open-editing-poll-dialog.component';
import { CloseOpenedPollDialogComponent } from './pages/dashboard/components/dialogs/close-opened-poll-dialog/close-opened-poll-dialog.component';
import { OpenClosedPollDialogComponent } from './pages/dashboard/components/dialogs/open-closed-poll-dialog/open-closed-poll-dialog.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PollService } from './services/dashboard-services/poll.service';
import { SendingPollsDialogComponent } from './pages/dashboard/components/dialogs/sending-polls-dialog/sending-polls-dialog.component';
import { CustomSnackBarComponent } from './pages/dashboard/components/dialogs/sending-polls-dialog/components/custom-snack-bar/custom-snack-bar.component';
import { LoginPanelComponent } from './pages/login-panel/login-panel.component';
import { RegisterPanelComponent } from './pages/register-panel/register-panel.component';
import { GreetingsComponent } from './pages/polling-form/components/greetings/greetings.component';

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
    StatusFilterComponent,
    PollsTableComponent,
    PollsAsCardsComponent,
    OpenEditingPollDialogComponent,
    CloseOpenedPollDialogComponent,
    OpenClosedPollDialogComponent,
    DashboardComponent,
    SendingPollsDialogComponent,
    CustomSnackBarComponent,
    LoginPanelComponent,
    RegisterPanelComponent,
    GreetingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [PollService],
  bootstrap: [AppComponent],
})
export class AppModule {}
