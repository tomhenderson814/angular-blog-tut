import { Injectable } from '@angular/core';
import { Blockchain, Transaction, TimeBasedEnergyTradeContract } from '../../Code/src/blockchain.js';
//import EC from 'elliptic';
import { peopleDatabase } from '../../Code/src/adapter.js';
//import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from 'src/Post.js';
//$ npx json-server db.json



@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  //public walletKeySubject: BehaviorSubject<string>;
  public blockchainInstance;
  public dataBaseInstance: peopleDatabase;
  public rank;
  public index;
  // public accountClassSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private apiURL = "http://localhost:3000/posts"
  
  constructor(private http: HttpClient) {
    this.dataBaseInstance = new peopleDatabase("Thomas", "Henderson", "Tom1", "Artie1");
    let genesisTransaction = new Transaction(null, this.dataBaseInstance.alphaAccount.walletKeys[0].publicKey, 100000, 0, 0, 0, null);
    let genTransaction = new Transaction(null, this.dataBaseInstance.alphaAccount.walletKeys[0].publicKey, 100000, 0, 0, 0, null);
    this.blockchainInstance = new Blockchain(genesisTransaction, genTransaction);
    this.blockchainInstance.difficulty = 4;
    this.blockchainInstance.minePendingTransactions('hi');
    this.dataBaseInstance.accountClass = [0, 0];
    this.rank = this.dataBaseInstance.accountClass[0];
    this.index = this.dataBaseInstance.accountClass[1];
    
// this.dataBaseInstance.createBetaAccount("Will", "Freddy", "Will1", "Freddy1");
// let tomPub = this.dataBaseInstance.alphaAccount.walletKeys[0].publicKey;
// let willPub = this.dataBaseInstance.betaAccounts[0].walletKeys[0].publicKey;
// let tomSign = this.dataBaseInstance.alphaAccount.walletKeys[0].keyObj;

// let myContract = new TimeBasedEnergyTradeContract();
// myContract.transactionTime = (1/6) * 60 * 1000;;
// myContract.conclusion = 22*1000;
// let myTransaction = new Transaction(tomPub, willPub, 10, 50, 0.2, 0, myContract);
// console.log("TomPub: " + tomPub);
// console.log("willPub: " + willPub);
// console.log("tomsign: " + tomSign);
// myContract.startEnergyTransfer(myTransaction, this.blockchainInstance, tomSign);
}
  
  getPost(): Observable<Post[]>{
    return this.http.get<Post[]>(this.apiURL);
  }

  deletePost(id: number): Observable<Post>{
    const url = `${this.apiURL}/${id}`;
    return this.http.delete<Post>(url);
  }

  editPost(post: any): Observable<Post>{
    const url = `${this.apiURL}/${post.id}`;
    return this.http.put<Post>(url, post);
  }

  addPost(post: any):Observable<Post>{

    return this.http.post<Post>(this.apiURL, post);
  }

  getPosts(id: number): Observable<Post>{
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Post>(url);
  }



  minePendingTransactions() {
    if (this.rank = 0){
      throw new Error('Currently no one is loggedIn');
    }
    else {
    this.blockchainInstance.minePendingTransactions(
      this.dataBaseInstance.loggedIn(this.rank, this.index).walletKeys[0].publicKey
    );
  }
  }

  addressIsFromCurrentUser(address) {
    let loggedInAccount = this.dataBaseInstance.loggedIn(this.rank, this.index);
    if(loggedInAccount && address === loggedInAccount.walletKeys[0].publicKey && this.rank !== 0) {
        return true;
    } else {
        return false;
    }
}


  getPendingTransactions() {
    return this.blockchainInstance.pendingTransactions;
  }

  addTransaction(tx) {
    this.blockchainInstance.addTransaction(tx);
  }



login(username: string, password: string) {
  this.dataBaseInstance.accountClass = this.dataBaseInstance.whatRankAccount(username, password);
  this.dataBaseInstance.primeAccount = this.dataBaseInstance.loggedIn(this.dataBaseInstance.accountClass[0], this.dataBaseInstance.accountClass[1]);
  
}

}
