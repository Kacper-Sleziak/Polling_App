import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormEditComponent } from './components/form-components/form-edit/form-edit.component';
import { PollingFormComponent } from './components/form-components/polling-form/polling-form.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'form/:slug', component: PollingFormComponent },
  { path: 'form/edit/:slug', component: FormEditComponent },
  { path: 'create-form', component: FormEditComponent },
  { path: '', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
