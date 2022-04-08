import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PollingFormComponent } from './components/form-components/polling-form/polling-form.component';
import { CreatePollComponent } from './pages/create-poll/create-poll.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PollsComponent } from './pages/polls/polls.component';

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'create-poll', component: CreatePollComponent},
  { path: 'polls', component: PollsComponent},
  { path: 'form/:slug', component: PollingFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
