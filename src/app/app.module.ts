
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MatPaginator } from '@angular/material/paginator';
import { AppComponent } from './app.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoanComponent } from './pages/loan/loan.component';
import { TransfersComponent } from './pages/transfers/transfers.component';
import { AccountComponent } from './pages/account/account.component';
import { HomeComponent } from './pages/home/home.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { MatCardModule } from '@angular/material/card';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort,MatSortModule } from '@angular/material/sort';
import { MatTable, MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatTab, MatTabsModule, MatTabGroup} from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { ModalModule } from 'ngb-modal';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionsFormComponent } from './components/transactions-form/transactions-form.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgChartsModule } from 'ng2-charts';
import { TransactionsVisualComponent } from './components/transactions-visual/transactions-visual.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    LoanComponent,
    TransfersComponent,
    AccountComponent,
    HomeComponent,
    TransactionsComponent,
    TopBarComponent,
    TransactionsTableComponent,
    TransactionsFormComponent,
    TransactionsVisualComponent,
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    NgxSpinnerModule,
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    MatFormFieldModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
    MatTableModule,
    ModalModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    NoopAnimationsModule,
    MatTabsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MatPaginator,MatSort,MatTableModule,MatTable, MatFormField, MatTab, MatTabGroup],
  bootstrap: [AppComponent]
})
export class AppModule { }
