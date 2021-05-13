import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommuteLeg, CommuteLegRequest } from './commute-model';

@Injectable({
  providedIn: 'root'
})
export class CommuteService {

  private baseURL: string;
  private http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) { this.baseURL = baseUrl; this.http = http; }

  public postCommute(leg: CommuteLeg) {
    var url = this.baseURL + 'api/CommuteLegs/true';

    const body = JSON.stringify(this.transformCommuteLeg(leg));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(url, body, httpOptions);
  }

  public postCommuteLeg(leg: CommuteLeg) {
    var url = this.baseURL + 'api/CommuteLegs/false';

    const body = JSON.stringify(this.transformCommuteLeg(leg));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(url, body, httpOptions);
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

  private transformCommuteLeg(commuteLeg: CommuteLeg): CommuteLegRequest {
    var returnVal = new CommuteLegRequest;
    returnVal.Id = commuteLeg.Id;
    returnVal.StartTime = commuteLeg.StartTime;
    returnVal.EndTime = commuteLeg.EndTime;
    returnVal.DestinationId = commuteLeg.Destination.id;
    returnVal.DelayReasonId = commuteLeg.DelayReason.id;
    returnVal.DelaySeconds = commuteLeg.DelaySeconds != null ? commuteLeg.DelaySeconds : 0;
    returnVal.FareClassId = commuteLeg.FareClass.id;
    returnVal.RouteId = commuteLeg.Route.id;
    returnVal.Notes = commuteLeg.Notes;

    return returnVal;

  }
}
