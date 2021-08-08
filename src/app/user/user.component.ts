import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetUserLoginService } from '../service/get-user-login.service';
import { WordService } from '../service/word.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public playerLogin: string = '';
  public disableButton = true;

  constructor(private getUserLogin: GetUserLoginService, public router: Router, private wordSevice: WordService) { }

  ngOnInit(): void {
  }

  sendLogin(login: string)
  {
    this.getUserLogin.sendUserLogin(login);
    this.router.navigate(['main-game']);
    this.wordSevice.sendErrorValues([]);
    this.wordSevice.sendLetterToCheck('');
  }

  checkIfLogin(playerLogin: string)
  {
    if(!playerLogin)
    {
      this.disableButton = true;
    }
    else
    {
      this.disableButton = false;
    }
  }
}
