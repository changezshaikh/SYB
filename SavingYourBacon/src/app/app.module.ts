import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
// used to create fake backend
import { fakeBackendProvider } from './helpers/fake-backend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { DataTablesModule } from 'angular-datatables';
import { MaterialModule } from '@angular/material';
import {DataTableModule, CalendarModule, ListboxModule} from 'primeng/primeng';
import 'hammerjs';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IncomeOverviewComponent } from './income-overview/income-overview.component';
import { ExpenseOverviewComponent } from './expense-overview/expense-overview.component';
import { GoLiveDateComponent } from './go-live-date/go-live-date.component';
import { ImportantDatesComponent } from './important-dates/important-dates.component';
import { NotificationComponent } from './notification/notification.component';
import { CreateExpenseComponent, CreateExpenseDialog } from './create-expense/create-expense.component';
import { CreateIncomeComponent, CreateIncomeDialog } from './create-income/create-income.component';
import { ExpenseAccountsComponent, CreateExpenseAccountDialog } from './expense-accounts/expense-accounts.component';
import { ConfirmDialogComponent } from './common/confirm-dialog.component';
import { IncomesComponent } from './incomes/incomes.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { MyAccountComponent } from './my-account/my-account.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
 
  // // otherwise redirect to home
  // { path: '**', redirectTo: '' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'expense-accounts', component: ExpenseAccountsComponent },
  { path: 'incomes', component: IncomesComponent },
  { path: 'create-expense', component: CreateExpenseComponent },
  { path: 'create-expense/:id', component: CreateExpenseComponent },
  { path: 'create-income', component: CreateIncomeComponent },
  { path: 'create-income/:id', component: CreateIncomeComponent },
  { path: 'my-account', component: MyAccountComponent },  
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full', canActivate: [AuthGuard]
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
    CreateIncomeComponent,
    CreateExpenseDialog,
    CreateIncomeDialog,
    CreateExpenseAccountDialog,
    ConfirmDialogComponent,
    ExpenseAccountsComponent,
    IncomesComponent,
    LoginComponent,
    MyAccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule,
    DataTablesModule,
    DataTableModule,
    CalendarModule,
    ListboxModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,

    // // providers used to create fake backend
    // fakeBackendProvider,
    // MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent],
  entryComponents: [CreateExpenseDialog, CreateIncomeDialog, CreateExpenseAccountDialog, ConfirmDialogComponent]
})
export class AppModule { }
