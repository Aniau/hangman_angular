import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  public letterToCheck = new BehaviorSubject<string>('');
  public errorsArray = new BehaviorSubject<number[]>([1]);
  public newRound = new BehaviorSubject<number>(0);

  constructor() { }

  //send letter to check from keyboard component
  sendLetterToCheck(letter: string): void
  {
    this.letterToCheck.next(letter);
  }
  
  //receive letter to check in word component
  public getLetterToCheck(): Observable<string>
  {
    return this.letterToCheck.asObservable();
  }

  //send errors array from word ts
  sendErrorValues(errors: number[]): void
  {
    this.errorsArray.next(errors);
  }

  // get error in svg component
  public getErrors(): Observable<number[]>
  {
    return this.errorsArray.asObservable();
  }

  sendInfoNewRound(newRound: number): void
  {
    this.newRound.next(newRound);
  } 

  public getInfoNewRound(): Observable<number>
  {
    return this.newRound.asObservable();
  }
}
