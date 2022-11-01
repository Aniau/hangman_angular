import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UpdateUser } from '../../app/store/actions';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  public playerLogin: string = '';

  constructor(private router: Router,
              private readonly store: Store) { }

  updateUserName(login: string): void {
    this.store.dispatch(UpdateUser({ user: login }));
    this.router.navigate(['main-game']);
  }
}
