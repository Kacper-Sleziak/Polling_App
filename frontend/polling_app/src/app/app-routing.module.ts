import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormEditComponent } from './pages/form-edit/form-edit.component';
import { PollingFormComponent } from './pages/polling-form/polling-form.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginPanelComponent } from './pages/login-panel/login-panel.component';
import { RegisterPanelComponent } from './pages/register-panel/register-panel.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPanelComponent },
  { path: 'register', component: RegisterPanelComponent },
  { path: 'form/:slug', component: PollingFormComponent },
  { path: 'form/edit/:slug', component: FormEditComponent },
  { path: 'create-form', component: FormEditComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
