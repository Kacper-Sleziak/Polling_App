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
import { CardComponent } from './pages/dashboard/components/card/card.component';
import { CreatePollCardComponent } from './pages/dashboard/components/create-poll-card/create-poll-card.component';
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
import { SendingPollsDialogComponent } from './pages/dashboard/components/dialogs/sending-polls-dialog/sending-polls-dialog.component';
import { CustomSnackBarComponent } from './pages/dashboard/components/dialogs/sending-polls-dialog/components/custom-snack-bar/custom-snack-bar.component';
import { LoginPanelComponent } from './pages/login-panel/login-panel.component';
import { RegisterPanelComponent } from './pages/register-panel/register-panel.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [PollService],
  bootstrap: [AppComponent],
})
export class AppModule {}
