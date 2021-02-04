import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Destination } from './destination-model'
import { DestinationService } from './destination.service';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {

  public entities: Destination[];
  private errorMessage: string;

  constructor(private service: DestinationService, private route: ActivatedRoute) { }

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
