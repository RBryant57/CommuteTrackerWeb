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
  public entities: Route[];
  private errorMessage: string;

  constructor(private service: RouteService, private route: ActivatedRoute) { }

  ngOnInit() {
    var param;
    this.route.params.subscribe(params => {
      param = params;
    });

    if (!!param.id) {
      this.loadEntity(param.id);
    }
    else {
      this.loadEntities();
      console.log(this.entities);
    }
  }

  private loadEntities() {
    this.service.getEntities().subscribe(
      entities => {
        this.entities = entities;
      },
      error => this.errorMessage = <any>error
    );
  }

  private loadEntity(id: number) {
    this.service.getEntity(id).subscribe(
      entity => {
        this.entities = new Array(entity);
      },
      error => this.errorMessage = <any>error
    );
  }

}
