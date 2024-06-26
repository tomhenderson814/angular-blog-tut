import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BlockchainService } from '../../services/blockchain.service';
import { Transaction } from '../../../Code/src/blockchain';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss']
})
export class CreateTransactionComponent {
  // public newTx: Transaction;
  // public dem = 10;
  // public sup = 1;
  // public accumEnergy = 0;
  // public timer = 0;
  // public newTrans;
  // public rank;
  // public index;
  // public preserved;
  // public energyTotal: any;
  // public duration: any;
  // public ownWalletKey;
  // public dataBase;
 
  // constructor(private blockchainService: BlockchainService, private router: Router) {
  //this.dataBase = this.blockchainService.dataBaseInstance;
  //   this.rank = this.dataBase.accountClass[0];
  //   this.index = this.dataBase.accountClass[1];
  //   this.ownWalletKey = this.dataBase.loggedIn(this.rank, this.index).walletKeys[0];
  //   this.newTx = new Transaction();
    
  // }

  // ngOnInit() {
  // }
  
  // createTransaction() {
  //   const newTx = this.newTx;

  //   // Set the FROM address and sign the transaction
  //   newTx.fromAddress = this.ownWalletKey.publicKey;

  //   console.log(this.ownWalletKey.publicKey);
  //   newTx.signTransaction(this.ownWalletKey.keyObj);

  //   try {
  //     this.blockchainService.addTransaction(this.newTx);
  //   } catch (e) {
  //     alert(e);
  //     return;
  //   }

  //   this.router.navigate(['/new/transaction/pending', { addedTx: true }]);
  //   this.newTx = new Transaction();
  // }

  // calculateExchangeRate(supply, demand) {
  //   // Ensure supply is not zero to avoid division by zero error
  //   if (supply === 0) {
  //     throw new Error('Supply cannot be zero');
  //   }

  //   return demand / supply;
  // }

  // // Hypothetical function to get the energy status from the grid provider
  // getEnergyStatus() {
  //   // This function should return true if the energy supply is consistent
  //   // and above a certain threshold, and false otherwise.
  //   // In this example, it's just a placeholder.
  //   return true;
  // }

  // outputCapacity(){
  //   return 4; //voltage per second
  // }

  
  // perSecondTrade() {
    
  //   // try {
      
  //     let energyTotal = this.energyTotal;
  //     let duration = this.duration;
  //     if (!energyTotal && !duration){
  //         throw new Error('You must set a maximum duration or a maximum energy received');
  //     }

  //     this.newTrans = new Transaction();

  //     //this.newTrans.fromAddress = this.preserved;
  //     this.newTrans.fromAddress = this.ownWalletKey.publicKey;
  //     this.newTrans.toAddress = this.newTx.toAddress;
  //     this.preserved = this.newTrans.toAddress;
  //     const currentEnergy = this.outputCapacity();

  //     const exchangeRate = this.calculateExchangeRate(this.sup, this.dem);
  //     const moneySent = exchangeRate * currentEnergy; // cost/kWh * kWh (cost in cents to the receiver) - $/(kWh * min) * kWh * 1 min
  //     this.newTrans.gasPrice = moneySent * 0.02;
  //     this.newTrans.amount = moneySent;
    

  //     if ( this.blockchainService.blockchainInstance.getBalanceOfAddress(this.ownWalletKey.publicKey) < moneySent) {
  //         throw new Error('Insufficient balance');
  //       }

        
  //     // Set the FROM address and sign the transaction
      
  //     this.newTrans.signTransaction(this.ownWalletKey.keyObj);
      

  //     try {
        
  //       this.blockchainService.addTransaction(this.newTrans);
  //     } catch (e) {
  //       alert(e);
  //       return;
  //     }

  //     this.accumEnergy = this.accumEnergy + currentEnergy;
  //     this.timer = this.timer + 5;
    

  //     if (energyTotal){
  //       if (this.accumEnergy < energyTotal){
  //         setTimeout(() => this.perSecondTrade(), 5000);
  //       }
  //     }

  //     if (duration){
  //       if (this.timer < duration){
  //         setTimeout(() => this.perSecondTrade(), 5000);
  //       }
  //     }
  //     console.log("Transaction is complete");
  //   }
  //   catch (error) {
  //       console.error('Error processing transaction:', error.message);
  //     }
  // }
}
