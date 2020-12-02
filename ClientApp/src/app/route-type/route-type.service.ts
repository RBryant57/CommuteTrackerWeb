import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { RouteType } from './route-type-model';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouteTypeService {

  private baseURL: string;
  private http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) { this.baseURL = baseUrl; this.http = http; }

  public getRouteTypes(): Observable<RouteType[]> {
    return this.http.get<RouteType[]>(this.baseURL + 'api/routetypes').pipe(
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
