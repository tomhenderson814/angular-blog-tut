import { Component, OnInit } from '@angular/core';
import { BlockchainService } from '../../services/blockchain.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-enter-signup',
  templateUrl: './enter-signup.component.html',
  styleUrls: ['./enter-signup.component.scss']
})
export class EnterSignupComponent implements OnInit {
  public data;
  public newFirstName: string;
  public newLastName: string;
  public newUsername: string;
  public newPassword: string;
  public isTrue: boolean;
  public newAccount = { newUsername: '', newPassword: '', newFirstName: '', newLastName: '' }; // Initialize current
  public displayUsername = '';
  public displayPassword = '';
  public displayFirst = '';
  public displayLast = '';
  public vary;
  
  constructor(private blockchainService: BlockchainService, private router: Router, private route: ActivatedRoute) { 
    this.data = blockchainService.dataBaseInstance;
    }
  confirm(){
    if (this.route.snapshot.paramMap.get('inSignup')) {
    this.isTrue = true;
  }
  }
  ngOnInit(): void {
  }

  addAccount(){
    this.displayFirst = this.newAccount.newFirstName;
    this.displayLast = this.newAccount.newLastName;
    this.displayUsername = this.newAccount.newUsername;
    this.displayPassword = this.newAccount.newPassword;
    
    if (this.data.doesUsernameExist(this.displayUsername)){
      console.log("Username already exists, please enter a different one");       //fix this up later
    }
    if (!this.data.doesUsernameExist(this.displayUsername)){
    this.data.createGammaAccount(this.displayFirst, this.displayLast, this.displayUsername, this.displayPassword);
    this.vary = this.data.gammaAccounts;
    console.log("Gamma Account Created");
    }
  }
  
}
