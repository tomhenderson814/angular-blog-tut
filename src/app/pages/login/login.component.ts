import { Component, OnInit } from '@angular/core';
import { BlockchainService } from '../../services/blockchain.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public data;
  public newAccount;
  public newFirstName: string;
  public newLastName: string;
  public newUsername: string;
  public newPassword: string;

  constructor(private blockchainService: BlockchainService, private router: Router) { 
    this.data = blockchainService.dataBaseInstance;
  }
  ngOnInit(): void {
  }

  enterLogin(){
    this.router.navigate(['enter-login', { inLogin: true }]);
  }
  enterSignup(){
    this.router.navigate(['enter-signup', { inSignup: true }]);
  }

}
