import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {AgGridModule} from "ag-grid-angular/main";

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IncomeOverviewComponent } from './income-overview/income-overview.component';
import { ExpenseOverviewComponent } from './expense-overview/expense-overview.component';
import { GoLiveDateComponent } from './go-live-date/go-live-date.component';
import { ImportantDatesComponent } from './important-dates/important-dates.component';
import { NotificationComponent } from './notification/notification.component';
import { CreateExpenseComponent } from './create-expense/create-expense.component';
import { CreateIncomeComponent } from './create-income/create-income.component';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'create-expense', component: CreateExpenseComponent },
  { path: 'create-income', component: CreateIncomeComponent },
  { path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    IncomeOverviewComponent,
    ExpenseOverviewComponent,
    GoLiveDateComponent,
    ImportantDatesComponent,
    NotificationComponent,
    CreateExpenseComponent,
    CreateIncomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
