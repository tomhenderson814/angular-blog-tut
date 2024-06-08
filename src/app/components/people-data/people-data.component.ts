import { Component, OnInit, Input } from '@angular/core';
import { BlockchainService } from '../../services/blockchain.service';

@Component({
  selector: 'app-people-data',
  templateUrl: './people-data.component.html',
  styleUrls: ['./people-data.component.scss']
})
export class PeopleDataComponent implements OnInit {
  public data;
  public alphaAccount;
  public betaAccounts;
  public gammaAccounts;
  
  constructor(private blockchainService: BlockchainService) { 
    this.data = blockchainService.dataBaseInstance;
    this.alphaAccount = this.data.alphaAccount;
    this.betaAccounts = this.data.betaAccounts;
    this.gammaAccounts = this.data.gammaAccounts;
  
  }
  returnBalanceAlpha(){
    let b = this.blockchainService.blockchainInstance.getBalanceOfAddress(this.data.alphaAccount.walletKeys[0].publicKey);
    return b;
  }
  
  returnBalanceBeta(index){
    let b = this.blockchainService.blockchainInstance.getBalanceOfAddress(this.data.betaAccounts[index].walletKeys[0].publicKey);
    return b;
  }

  returnBalanceGamma(index){
    let b = this.blockchainService.blockchainInstance.getBalanceOfAddress(this.data.gammaAccounts[index].walletKeys[0].publicKey);
    return b;
  }

  ngOnInit(): void {
  }
 

}

