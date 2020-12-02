import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  private baseUrl: string;

  constructor(baseURL: string, protected http: HttpClient) {
    this.baseUrl = baseURL;
  }

  getRoutes() {
      this.http.get<Route[]>(this.baseUrl + 'api/routes').subscribe(result => {
      return result;
    }, error => console.error(error));
  }

  getRoute(routeId: number) { }

}

interface Route {

}
