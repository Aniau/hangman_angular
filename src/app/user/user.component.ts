import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetUserLoginService } from '../service/get-user-login.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public playerLogin: string = '';
  public disableButton = false;

  constructor(private getUserLogin: GetUserLoginService, public router: Router) { }

  ngOnInit(): void {
  }

  sendLogin(login: string)
  {

    this.getUserLogin.sendUserLogin(login);
    this.router.navigate(['main-game']);

  }

  checkIfLogin(playerLogin: string)
  {
    console.log(playerLogin);
    if(!playerLogin)
    {
      this.disableButton = true;
      console.log('true: ' + this.disableButton);
    }
    else
    {
      console.log('false: ' + this.disableButton);
      this.disableButton = false;
    }
  }
}
