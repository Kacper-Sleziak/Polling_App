import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormEditComponent } from './pages/form-edit/form-edit.component';
import { PollingFormComponent } from './pages/polling-form/polling-form.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginPanelComponent } from './pages/login-panel/login-panel.component';
import { RegisterPanelComponent } from './pages/register-panel/register-panel.component';
import { ResultsComponent } from './pages/results/results.component';
import { GreetingsComponent } from './pages/polling-form/components/greetings/greetings.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPanelComponent },
  { path: 'register', component: RegisterPanelComponent },
  { path: 'form/:slug', component: PollingFormComponent },
  { path: 'form/edit/:slug', component: FormEditComponent },
  { path: 'create-form', component: FormEditComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'answers/poll_answers_by_slug/:slug', component: ResultsComponent },
  { path: 'greetings', component: GreetingsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
