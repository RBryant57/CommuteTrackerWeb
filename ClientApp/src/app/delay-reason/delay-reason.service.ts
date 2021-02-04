import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DelayReason } from './delay-reason-model';

@Injectable({
  providedIn: 'root'
})
export class DelayReasonService {

  private baseURL: string;
  private http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) { this.baseURL = baseUrl; this.http = http; }

  public getEntities(): Observable<DelayReason[]> {
    return this.http.get<DelayReason[]>(this.baseURL + 'api/delayreasons').pipe(
      //tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public getEntity(id: number): Observable<DelayReason> {
    return this.http.get<DelayReason>(this.baseURL + 'api/delayreasons/' + id).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
