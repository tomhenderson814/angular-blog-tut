import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BlockchainService } from '../../services/blockchain.service';
import { Transaction } from '../../../Code/src/blockchain.js';

@Component({
  selector: 'app-create-tx',
  templateUrl: './create-tx.component.html',
  styleUrls: ['./create-tx.component.scss']
})
export class CreateTxComponent implements OnInit {
  public newTx: Transaction;
  public dem = 1.2;
  public sup = 1;
  public accumEnergy = 0;
  public timer = 0;
  public newTrans;
  public preserved;
  public rank;
  public index;
  public energyTotal: any;
  public duration: any;
  public ownWalletKey;
  public dataBase;
  public amount;
  public toAddress;
 
  constructor(private blockchainService: BlockchainService, private router: Router) {
    this.dataBase = this.blockchainService.dataBaseInstance;
    this.rank = this.dataBase.accountClass[0];
    this.index = this.dataBase.accountClass[1];
    this.ownWalletKey = this.dataBase.loggedIn(this.rank, this.index).walletKeys[0];


    
  }

  ngOnInit() {
  }
  
  createTransaction() {


   const theKey = this.ownWalletKey.publicKey;
   const money = this.amount;
   const To = this.toAddress;

    const newTx = new Transaction(theKey, To, money, 0, 0, 0, )
    newTx.signTransaction(this.ownWalletKey.keyObj);
    try {
      this.blockchainService.addTransaction(newTx);
    } catch (e) {
      alert(e);
      return;
    }

    this.router.navigate(['/new/transaction/pending', { addedTx: true }]);
    this.newTx = null;
  }

  calculateExchangeRate(supply, demand) {
    // Ensure supply is not zero to avoid division by zero error
    if (supply === 0) {
      throw new Error('Supply cannot be zero');
    }
    let exc = 5 * demand/supply
    if (exc < 1) {
      exc = 1;
    }
    if (exc > 10){
      exc = 10;
    }
    return exc;
  }

  // Hypothetical function to get the energy status from the grid provider
  getEnergyStatus() {
    // This function should return true if the energy supply is consistent
    // and above a certain threshold, and false otherwise.
    // In this example, it's just a placeholder.
    return true;
  }

  outputCapacity(){
    return 4; //voltage per second
  }

  
  perSecondTrade() {
    
    try {
      
      let energyTotal = this.energyTotal;
      let duration = this.duration;
      if (!energyTotal && !duration){
          throw new Error('You must set a maximum duration or a maximum energy received');
      }

      //this.newTrans = new Transaction();

      //this.newTrans.fromAddress = this.preserved;
      //this.newTrans.fromAddress = this.ownWalletKey.publicKey;
      //this.newTrans.toAddress = this.newTx.toAddress;
      //this.preserved = this.newTrans.toAddress;
      const currentEnergy = this.outputCapacity();
      const Too = this.toAddress;

      const exchangeRate = this.calculateExchangeRate(this.sup, this.dem);
      const moneySent = exchangeRate * currentEnergy; // cost/kWh * kWh (cost in cents to the receiver) - $/(kWh * min) * kWh * 1 min
      //this.newTrans.gasPrice = moneySent * 0.02;
      //this.newTrans.amount = moneySent;
      //this.newTrans.amountEnergy = currentEnergy;
      //this.newTrans.pricePerEnergy = exchangeRate;
      this.newTrans = new Transaction(this.ownWalletKey.publicKey, Too, moneySent, currentEnergy, exchangeRate, moneySent*0.02)

      if ( this.blockchainService.blockchainInstance.getBalanceOfAddress(this.ownWalletKey.publicKey) < moneySent) {
          throw new Error('Insufficient balance');
        }

        
      // Set the FROM address and sign the transaction
      
      this.newTrans.signTransaction(this.ownWalletKey.keyObj);
      

      try {
        
        this.blockchainService.addTransaction(this.newTrans);
      } catch (e) {
        alert(e);
        return;
      }

      this.accumEnergy = this.accumEnergy + currentEnergy;
      this.timer = this.timer + 5;
    

      if (energyTotal){
        if (this.accumEnergy < energyTotal){
          setTimeout(() => this.perSecondTrade(), 5000);
        }
      }

      if (duration){
        if (this.timer < duration){
          setTimeout(() => this.perSecondTrade(), 5000);
        }
      }
      console.log("Transaction is complete");
    }
    catch (error) {
        console.error('Error processing transaction:', error.message);
      }
  }


  getAccountType(publicKey: string): string {
    if (publicKey === this.dataBase.alphaAccount?.walletKeys[0].publicKey) {
        return 'Alpha';
    }
    for (let beta of this.dataBase.betaAccounts) {
        if (beta.walletKeys[0].publicKey === publicKey) {
            return 'Beta';
        }
    }
    for (let gamma of this.dataBase.gammaAccounts) {
        if (gamma.walletKeys[0].publicKey === publicKey) {
            return 'Gamma';
        }
    }
    if (publicKey === this.dataBase.emptyAccount.walletKeys[0].publicKey) {
        return 'Empty';
    }
    return '';
}

  
}
