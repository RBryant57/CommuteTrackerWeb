import { Component, OnInit } from '@angular/core';
import { Route } from '../route/route-model';
import { RouteService } from '../route/route.service';
import { FilterService } from 'primeng/api';
import { DelayReason } from '../delay-reason/delay-reason-model';
import { DelayReasonService } from '../delay-reason/delay-reason.service';

@Component({
  selector: 'app-pass-condition',
  templateUrl: './pass-condition.component.html',
  styleUrls: ['./pass-condition.component.css'],
  providers: [FilterService]
})
export class PassConditionComponent implements OnInit {
  public routes: Route[];
  public selectedRoute: Route;
  public delayReasons: DelayReason[];
  public selectedDelayReason: DelayReason;
  public startTime: string;
  public endTime: string;

  private errorMessage: string;


  displayMonths = 2;
  navigation = 'select';
  showWeekNumbers = false;
  outsideDays = 'visible';

  constructor(private routeService: RouteService, private delayReasonService: DelayReasonService) { }

  ngOnInit() {
    this.loadRoutes();
    this.loadDelayReasons();
  }

  public markTime(type: string) {
    if (type == 'start') {
      var newDate = new Date();
      this.startTime = newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds();
    }
    else {
      var newDate = new Date();
      this.endTime = newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds();
    }
    //type == 'start'? this.startTime = new Date().getHours(): this.endTime = new Date().getTime();
  }

  private loadRoutes() {
    this.routeService.getEntities().subscribe(
      routes => {
        this.routes = routes;
      },
      error => this.errorMessage = <any>error
    );
  }

  private loadDelayReasons() {
    this.delayReasonService.getEntities().subscribe(
      entities => {
        this.delayReasons = entities;
        this.delayReasons.sort((n1, n2) => {
          if (n1.id > n2.id) { return 1; }
          if (n1.id < n2.id) { return -1; }
          return 0;
        });
      },
      error => this.errorMessage = <any>error
    );
  }
}
