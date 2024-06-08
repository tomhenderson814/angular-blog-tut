import { Component, OnInit } from '@angular/core';
import { BlockchainService } from '../../services/blockchain.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-enter-login',
  templateUrl: './enter-login.component.html',
  styleUrls: ['./enter-login.component.scss']
})
export class EnterLoginComponent implements OnInit {

  public data;
  public isTrue: boolean;
  public current = { username: '', password: '' }; // Initialize current
  public displayUsername = '';
  public displayPassword = '';
  public rank;

  constructor(private blockchainService: BlockchainService, private router: Router, private route: ActivatedRoute) { 
    this.data = blockchainService.dataBaseInstance;
    
  }
  confirm(){
    if (this.route.snapshot.paramMap.get('inLogin')) {
    this.isTrue = true;
  }
  }
  ngOnInit(): void {
  //   const txt1 = document.getElementById("tbuser") as HTMLInputElement;
  // const btn1 = document.getElementById("btn1") as HTMLButtonElement;
  // const out1 = document.getElementById("output1") as HTMLElement;
  //   if (btn1) {
  //     btn1.addEventListener('click', () => {
  //       if (out1 && txt1) {
  //         out1.innerHTML = txt1.value;
  //       }
  //     });
  //   }
  }


  signIn(){
  //this.data.accountClass = this.data.whatRankAccount(this.current.username, this.current.password);  
  this.blockchainService.login(this.current.username, this.current.password);
  this.displayUsername = this.current.username;
  this.displayPassword = this.current.password;
  this.rank = this.data.accountClass;
  let dataBase = this.blockchainService.dataBaseInstance;
  console.log(dataBase.accountClass[0]);
  let ac = dataBase.loggedIn(dataBase.accountClass[0], dataBase.accountClass[1])
    console.log(ac);
  }

}
