import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Destination } from '../destination/destination-model';
import { DestinationService } from '../destination/destination.service';
import { Route } from '../route/route-model';
import { RouteService } from '../route/route.service';
import { FilterService } from 'primeng/api';
import { DelayReason } from '../delay-reason/delay-reason-model';
import { DelayReasonService } from '../delay-reason/delay-reason.service';
import { FareClass } from '../fare-class/fare-class-model';
import { FareClassService } from '../fare-class/fare-class.service';

@Component({
  selector: 'app-commute',
  templateUrl: './commute.component.html',
  styleUrls: ['./commute.component.css'],
  providers: [FilterService]
})
export class CommuteComponent implements OnInit {
  commuteForm: FormGroup;

  public routes: Route[];
  public selectedRoute: Route;
  public delayReasons: DelayReason[];
  public selectedDelayReason: DelayReason;
  public destinations: Destination[];
  public selectedDestination: Destination;
  public fareClasses: FareClass[];
  public selectedFareClass: FareClass;
  public startTime: string;
  public endTime: string;
  public name = new FormControl('commute');

  private errorMessage: string;


  displayMonths = 2;
  navigation = 'select';
  showWeekNumbers = false;
  outsideDays = 'visible';

  constructor(private routeService: RouteService, private delayReasonService: DelayReasonService, private destinationService: DestinationService, private fareClassService: FareClassService) {
    this.commuteForm = this.createFormGroup();
   }

  ngOnInit() {
    this.loadRoutes();
    this.loadDestinations();
    this.loadDelayReasons();
    this.loadFareClasses();
  }

  createFormGroup(){
    return new FormGroup({
      date: new FormControl(),
      startTime: new FormControl(),
      endTime: new FormControl(),
      destination: new FormControl(),
      delayReason: new FormControl(),
      delaySeconds: new FormControl(),
      fareClass: new FormControl(),
      route: new FormControl(),
      notes: new FormControl()
    });
  }

  public markTime(type: string){
    if(type == 'start'){
      var newDate = new Date();
      var hours = newDate.getHours().toString().length == 1 ? '0' + newDate.getHours() : newDate.getHours();
      var minutes = newDate.getMinutes().toString().length == 1 ? '0' + newDate.getMinutes() : newDate.getMinutes();
      var seconds = newDate.getSeconds().toString().length == 1 ? '0' + newDate.getSeconds() : newDate.getSeconds();
      this.startTime = hours + ':' + minutes + ':' + seconds;
    }
    else{
      var newDate = new Date();
      var hours = newDate.getHours().toString().length == 1 ? '0' + newDate.getHours() : newDate.getHours();
      var minutes = newDate.getMinutes().toString().length == 1 ? '0' + newDate.getMinutes() : newDate.getMinutes();
      var seconds = newDate.getSeconds().toString().length == 1 ? '0' + newDate.getSeconds() : newDate.getSeconds();
      this.endTime = hours + ':' + minutes + ':' + seconds;
    }
    //type == 'start'? this.startTime = new Date().getHours(): this.endTime = new Date().getTime();
  }

  public addLeg(form: FormGroup) {
    console.log(form.value.delayReason);
  }

  public completeCommute() {

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
          if(n1.id > n2.id){ return 1;}
          if(n1.id < n2.id){ return -1;}
          return 0;
        });
      },
      error => this.errorMessage = <any>error
    );
  }

  private loadDestinations() {
    this.destinationService.getEntities().subscribe(
      entities => {
        this.destinations = entities;
      },
      error => this.errorMessage = <any>error
    );
  }

  private loadFareClasses() {
    this.fareClassService.getEntities().subscribe(
      entities => {
        this.fareClasses = entities;
        this.fareClasses.sort((n1, n2) => {
          if(n1.id > n2.id){ return 1;}
          if(n1.id < n2.id){ return -1;}
          return 0;
        });
      },
      error => this.errorMessage = <any>error
    );
  }
}
