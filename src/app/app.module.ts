import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BussinessComponent } from './bussiness/bussiness.component';

import { FormsModule } from '@angular/forms';
import { TexpensesComponent } from './texpenses/texpenses.component';
import { IncomeService } from './income.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClientModule } from '@angular/common/http';
import { VstatementComponent } from './vstatement/vstatement.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './profile/profile.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ReportComponent } from './report/report.component';
import { LoginComponent } from './login/login.component';
import { Login2Component } from './login2/login2.component';
import { Profile2Component } from './profile2/profile2.component';


@NgModule({
  declarations: [
    AppComponent,
    BussinessComponent,

    TexpensesComponent,
    VstatementComponent,
    ProfileComponent,
    ReportComponent,
    LoginComponent,
    Login2Component,
    Profile2Component,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatButtonModule,
     MatIconModule,
     HttpClientModule
     

  ],
  providers: [IncomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
