import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlockchainViewerComponent } from './pages/blockchain-viewer/blockchain-viewer.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { CreateTransactionComponent } from './pages/create-transaction/create-transaction.component';
import { PendingTransactionsComponent } from './pages/pending-transactions/pending-transactions.component';
import { WalletBalanceComponent } from './pages/wallet-balance/wallet-balance.component';
import { DatabaseComponent } from './pages/database/database.component';
import { LoginComponent } from './pages/login/login.component';
import { EnterLoginComponent } from './components/enter-login/enter-login.component';
import { EnterSignupComponent } from './components/enter-signup/enter-signup.component';
import { GetstartedComponent } from './pages/getstarted/getstarted.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { EditpostComponent } from './components/editpost/editpost.component';

const routes: Routes = [
  {path: '', component: BlockchainViewerComponent },
  {path: 'settings', component: SettingsComponent},
  {path: 'new/transaction', component: CreateTransactionComponent },
  {path: 'new/transaction/pending', component: PendingTransactionsComponent },
  {path: 'wallet/:address', component: WalletBalanceComponent },
  {path: 'database', component: DatabaseComponent },
  {path: 'login', component:LoginComponent},
  {path: 'enter-login', component:EnterLoginComponent},
  {path: 'enter-signup', component:EnterSignupComponent},
  {path: 'getStarted', component: GetstartedComponent},
  {path: 'add-post', component: AddPostComponent},
  {path: 'edit-post/:id', component: EditpostComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
