import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BaseRequestOptions } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { NotificationsComponent, ViewNotificationDialog } from './notifications/notifications.component';
import { RegisterPageComponent } from './register-page/register-page.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register-page', component: RegisterPageComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'expense-accounts', component: ExpenseAccountsComponent, canActivate: [AuthGuard] },
  { path: 'incomes', component: IncomesComponent, canActivate: [AuthGuard] },
  { path: 'create-expense', component: CreateExpenseComponent, canActivate: [AuthGuard] },
  { path: 'create-expense/:id', component: CreateExpenseComponent, canActivate: [AuthGuard] },
  { path: 'create-income', component: CreateIncomeComponent, canActivate: [AuthGuard] },
  { path: 'create-income/:id', component: CreateIncomeComponent, canActivate: [AuthGuard] },
  { path: 'my-account', component: MyAccountComponent, canActivate: [AuthGuard] },  
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
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
    CreateExpenseComponent,
    CreateIncomeComponent,
    CreateExpenseDialog,
    CreateIncomeDialog,
    CreateExpenseAccountDialog,
    ConfirmDialogComponent,
    ViewNotificationDialog,
    ExpenseAccountsComponent,
    IncomesComponent,
    LoginComponent,
    MyAccountComponent,
    NotificationsComponent,
    RegisterPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule,
    DataTableModule,
    CalendarModule,
    ListboxModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent],
  entryComponents: [CreateExpenseDialog, CreateIncomeDialog, CreateExpenseAccountDialog, ConfirmDialogComponent, ViewNotificationDialog]
})
export class AppModule { }
