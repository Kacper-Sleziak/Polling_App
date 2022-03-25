import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PollingFormComponent } from './components/form-components/polling-form/polling-form.component';

const routes: Routes = [
  { path: 'form', component: PollingFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
