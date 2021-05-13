import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { PassCondition } from './pass-condition-model';

@Injectable({
  providedIn: 'root'
})
export class PassConditionService {

  private baseURL: string;
  private http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) { this.baseURL = baseUrl; this.http = http; }

  public postPassCondition(passCondition: PassCondition) {
    var url = this.baseURL + 'api/PassConditions';

    const body = JSON.stringify(passCondition);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(url, body, httpOptions);
  }

}
