import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlockViewComponent } from './components/block-view/block-view.component';
import { BlockchainViewerComponent } from './pages/blockchain-viewer/blockchain-viewer.component';

import { BlockchainService } from './services/blockchain.service';
import { SettingsComponent } from './pages/settings/settings.component';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';
import { CreateTransactionComponent } from './pages/create-transaction/create-transaction.component';
import { PendingTransactionsComponent } from './pages/pending-transactions/pending-transactions.component';
import { WalletBalanceComponent } from './pages/wallet-balance/wallet-balance.component';
import { DatabaseComponent } from './pages/database/database.component';
import { LoginComponent } from './pages/login/login.component';
import { EnterLoginComponent } from './components/enter-login/enter-login.component';
import { EnterSignupComponent } from './components/enter-signup/enter-signup.component';
import { CreateTxComponent } from './components/create-tx/create-tx.component';
import { PeopleDataComponent } from './components/people-data/people-data.component';
import { GetstartedComponent } from './pages/getstarted/getstarted.component';
import { GetsComponent } from './components/gets/gets.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { EditpostComponent } from './components/editpost/editpost.component';

@NgModule({
  declarations: [
    AppComponent,
    BlockViewComponent,
    BlockchainViewerComponent,
    SettingsComponent,
    TransactionsTableComponent,
    CreateTransactionComponent,
    PendingTransactionsComponent,
    WalletBalanceComponent,
    DatabaseComponent,
    LoginComponent,
    EnterLoginComponent,
    EnterSignupComponent,
    CreateTxComponent,
    PeopleDataComponent,
    GetstartedComponent,
    GetsComponent,
    AddPostComponent,
    EditpostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    BlockchainService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
