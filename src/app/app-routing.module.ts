import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component"
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { LoanComponent} from './pages/loan/loan.component';
import { TransfersComponent } from './pages/transfers/transfers.component';
import { AccountComponent } from './pages/account/account.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'loan', component: LoanComponent },
  { path: 'transfers', component: TransfersComponent },
  { path: 'account', component: AccountComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
