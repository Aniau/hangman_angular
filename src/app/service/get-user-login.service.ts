import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetUserLoginService {
  public userLogin = new BehaviorSubject<string>('');
  constructor() { }

    //send letter to check from keyboard component
    sendUserLogin(login: string): void
    {
      this.userLogin.next(login);
    }
    
    //receive letter to check in word component
    public getUserLogin(): Observable<string>
    {
      return this.userLogin.asObservable();
    }
}
