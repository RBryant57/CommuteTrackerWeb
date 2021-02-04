import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DelayReason } from './delay-reason-model';
import { DelayReasonService } from './delay-reason.service';

@Component({
  selector: 'app-delay-reason',
  templateUrl: './delay-reason.component.html',
  styleUrls: ['./delay-reason.component.css']
})
export class DelayReasonComponent implements OnInit {
  public entities: DelayReason[];
  private errorMessage: string;

  constructor(private service: DelayReasonService, private route: ActivatedRoute) { }

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
