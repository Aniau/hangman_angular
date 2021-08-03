import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { words } from '../model/answer';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiConnectService {

  constructor(private http: HttpClient) { }
  getWords(): Observable<words[]>
  {
    return this.http.get<words[]>('assets/answers.json').pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never>
  {
    return throwError(`Błąd załadowania listy aptek! Statusem błędu: ${error.status}`);
  }
}
