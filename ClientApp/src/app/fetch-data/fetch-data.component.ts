import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];
  public routes: Route[];
  public unitTypes: UnitType[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Route[]>(baseUrl + 'api/routes').subscribe(result => {
    //http.get<WeatherForecast[]>(baseUrl + 'weatherforecast').subscribe(result => {
      this.routes = result;
      console.log(this.routes);
    }, error => console.error(error));
  }
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
interface Route {
  id: number;
  name: string;
  routeTypeId: number;
  miles: number;
  notes: string;
}
interface UnitType {
  id: number;
  name: string;
  notes: string;
  unit: string;
}
