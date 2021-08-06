import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetUserLoginService } from '../service/get-user-login.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public playerLogin: string = '';

  constructor(private getUserLogin: GetUserLoginService, public router: Router) { }

  ngOnInit(): void {
  }

  sendLogin(login: string)
  {

    this.getUserLogin.sendUserLogin(login);
    // this.router.navigate(['hangman']);
  }
}
