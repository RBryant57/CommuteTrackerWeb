import { Component, OnInit } from '@angular/core';
import { RouteType } from './route-type-model';
import { RouteTypeService } from './route-type.service';

@Component({
  selector: 'app-routetype',
  templateUrl: './route-type.component.html',
  styleUrls: ['./route-type.component.css']
})
export class RouteTypeComponent implements OnInit {
  private routeTypes: RouteType[];
  private errorMessage: string;

  constructor(private routeTypeService: RouteTypeService) { }

  ngOnInit() {
    this.routeTypeService.getRouteTypes().subscribe(
      routeTypes => {
        this.routeTypes = routeTypes;
      },
      error => this.errorMessage = <any>error
    );
  }

}
