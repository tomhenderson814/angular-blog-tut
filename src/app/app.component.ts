import { Component, OnInit } from '@angular/core';
import { BlockchainService } from './services/blockchain.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public blockchain;
  public showInfoMessage = true;
  public data;

  constructor(private blockchainService: BlockchainService) {
    this.blockchain = blockchainService.blockchainInstance;
    this.data = blockchainService.dataBaseInstance;
  }

  ngOnInit() {
  }
  
  isAlphaOrBeta(){
    if (this.data.accountClass[0] === 1 || this.data.accountClass[0] === 2){
      return true;
  
    }
    return false;
  }

  thereArePendingTransactions() {
    return this.blockchain.pendingTransactions.length > 0;
  }

  dismissInfoMessage() {
    this.showInfoMessage = false;
  }
}
