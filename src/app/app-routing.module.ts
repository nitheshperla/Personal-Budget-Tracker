import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BussinessComponent } from './bussiness/bussiness.component';

import { TexpensesComponent } from './texpenses/texpenses.component';
import { VstatementComponent } from './vstatement/vstatement.component';
import { ProfileComponent } from './profile/profile.component';
import { ReportComponent } from './report/report.component';
import { LoginComponent } from './login/login.component';
import { Login2Component } from './login2/login2.component';
import { Profile2Component } from './profile2/profile2.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  { path: '', redirectTo: '/AppComponent', pathMatch: 'full' },

  { path: 'profile2', component: Profile2Component },
  { path: 'AppComponent', component: AppComponent },

  { path: 'bussiness', component: BussinessComponent },
  { path: 'texpenses', component: TexpensesComponent },
  { path: 'vstatement', component: VstatementComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'report', component: ReportComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
