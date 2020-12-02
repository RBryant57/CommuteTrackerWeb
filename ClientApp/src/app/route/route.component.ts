import { Component, OnInit } from '@angular/core';
import { Route } from './route-model';
import { RouteService } from './route.service';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {
  private routes: Route[];
  private errorMessage: string;

  constructor(private routeService: RouteService) { }

  ngOnInit() {
    this.routeService.getRoutes().subscribe(
      routes => {
        this.routes = routes;
      },
      error => this.errorMessage = <any>error
    );
  }

}
