import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FareClass } from './fare-class-model';
import { FareClassService } from './fare-class.service';

@Component({
  selector: 'app-fare-class',
  templateUrl: './fare-class.component.html',
  styleUrls: ['./fare-class.component.css']
})
export class FareClassComponent implements OnInit {
  public entities: FareClass[];
  private errorMessage: string;

  constructor(private service: FareClassService, private route: ActivatedRoute) { }

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
