import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PollingFormComponent } from './components/form-components/polling-form/polling-form.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'form/:slug', component: PollingFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
