import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private routeService: RouteService, private route: ActivatedRoute) { }

  ngOnInit() {
    var param;
    this.route.params.subscribe(params => {
      param = params;
    });

    if (!!param.id) {
      this.loadRoute(param.id);
    }
    else {
      this.loadRoutes();
    }
  }

  private loadRoutes() {
    this.routeService.getRoutes().subscribe(
      routes => {
        this.routes = routes;
      },
      error => this.errorMessage = <any>error
    );
  }

  private loadRoute(id: number) {
    this.routeService.getRoute(id).subscribe(
      route => {
        this.routes = new Array(route);
      },
      error => this.errorMessage = <any>error
    );
  }

}
