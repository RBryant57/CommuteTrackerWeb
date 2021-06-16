import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Destination } from '../destination/destination-model';
import { DestinationService } from '../destination/destination.service';
import { Route } from '../route/route-model';
import { RouteService } from '../route/route.service';
//import { FilterService } from 'primeng/api';
import { DelayReason } from '../delay-reason/delay-reason-model';
import { DelayReasonService } from '../delay-reason/delay-reason.service';
import { FareClass } from '../fare-class/fare-class-model';
import { FareClassService } from '../fare-class/fare-class.service';
import { CommuteLeg } from './commute-model';
import { CommuteService } from './commute.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-commute',
  templateUrl: './commute.component.html',
  styleUrls: ['./commute.component.css'],
  //providers: [FilterService]
})
export class CommuteComponent implements OnInit {
  commuteForm: FormGroup;

  public routes: Route[];
  //public selectedRoute: Route;
  public delayReasons: DelayReason[];
  //public selectedDelayReason: DelayReason;
  //public delaySeconds: number;
  public destinations: Destination[];
  //public selectedDestination: Destination;
  public fareClasses: FareClass[];
  //public selectedFareClass: FareClass;
  public startTime: string;
  public endTime: string;
  //public date: Date;
  public name = new FormControl('commute');
  public showDelaySeconds: boolean = false;

  private errorMessage: string;


  displayMonths = 2;
  navigation = 'select';
  showWeekNumbers = false;
  outsideDays = 'visible';

  constructor(private routeService: RouteService, private delayReasonService: DelayReasonService, private destinationService: DestinationService, private fareClassService: FareClassService, private commuteService: CommuteService, private alertService: AlertService) {
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
      delayReasonName: new FormControl(),
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
      this.commuteForm.controls['startTime'].setValue(hours + ':' + minutes + ':' + seconds);
    }
    else{
      var newDate = new Date();
      var hours = newDate.getHours().toString().length == 1 ? '0' + newDate.getHours() : newDate.getHours();
      var minutes = newDate.getMinutes().toString().length == 1 ? '0' + newDate.getMinutes() : newDate.getMinutes();
      var seconds = newDate.getSeconds().toString().length == 1 ? '0' + newDate.getSeconds() : newDate.getSeconds();
      this.commuteForm.controls['endTime'].setValue(hours + ':' + minutes + ':' + seconds);
    }
  }

  public addLeg() {
    var commuteLeg = new CommuteLeg();

    var commuteDate = this.commuteForm.controls['date'].value;
    var startTime = this.commuteForm.controls['startTime'].value;
    var endTime = this.commuteForm.controls['endTime'].value;
    var startHours = startTime.slice(0, 2);
    var startMinutes = startTime.slice(3, 5);
    var startSeconds = startTime.slice(9);
    var endHours = endTime.slice(0, 2);
    var endMinutes = endTime.slice(3, 5);
    var endSeconds = endTime.slice(9);

    commuteLeg.StartTime = new Date(commuteDate.year, commuteDate.month, commuteDate.day, startHours, startMinutes, startSeconds);
    commuteLeg.EndTime = new Date(commuteDate.year, commuteDate.month, commuteDate.day, endHours, endMinutes, endSeconds);
    commuteLeg.Destination = this.commuteForm.controls['destination'].value;
    commuteLeg.DelayReason = this.commuteForm.controls['delayReasonName'].value;
    commuteLeg.DelaySeconds = this.commuteForm.controls['delaySeconds'].value;
    commuteLeg.FareClass = this.commuteForm.controls['fareClass'].value;
    commuteLeg.Route = this.commuteForm.controls['route'].value;

    this.commuteService.postCommuteLeg(commuteLeg)
      .subscribe(result => {
        this.alertService.success('Commute leg successfully added.');
      }, error => {
          this.alertService.error('Commute leg was not successfully added.');
      });

    this.clearForm();
  }

  public completeCommute() {
    var commuteLeg = new CommuteLeg();

    var commuteDate = this.commuteForm.controls['date'].value;
    var startTime = this.commuteForm.controls['startTime'].value;
    var endTime = this.commuteForm.controls['endTime'].value;
    var startHours = startTime.slice(0, 2);
    var startMinutes = startTime.slice(3, 5);
    var startSeconds = startTime.slice(9);
    var endHours = endTime.slice(0, 2);
    var endMinutes = endTime.slice(3, 5);
    var endSeconds = endTime.slice(9);

    commuteLeg.StartTime = new Date(commuteDate.year, commuteDate.month, commuteDate.day, startHours, startMinutes, startSeconds);
    commuteLeg.EndTime = new Date(commuteDate.year, commuteDate.month, commuteDate.day, endHours, endMinutes, endSeconds);
    commuteLeg.Destination = this.commuteForm.controls['destination'].value;
    commuteLeg.DelayReason = this.commuteForm.controls['delayReasonName'].value;
    commuteLeg.DelaySeconds = this.commuteForm.controls['delaySeconds'].value;
    commuteLeg.FareClass = this.commuteForm.controls['fareClass'].value;
    commuteLeg.Route = this.commuteForm.controls['route'].value;

    this.commuteService.postCommute(commuteLeg)
      .subscribe(result => {
      }, error => {
        console.log(error)
      });

    this.clearForm();
  }

  public delayReasonChange() {
    var delayReason = this.commuteForm.controls['delayReasonName'].value;
    if (delayReason.id === 1) {
      this.showDelaySeconds = false;
      this.commuteForm.controls['delaySeconds'].reset();
    }
    else {
      this.showDelaySeconds = true;
    }
  }

  isValidInput(fieldName): boolean {
    return this.commuteForm.controls[fieldName].invalid &&
      (this.commuteForm.controls[fieldName].dirty || this.commuteForm.controls[fieldName].touched);
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

  private clearForm() {
    this.commuteForm.controls['date'].setValue('');
    this.commuteForm.controls['startTime'].setValue('');
    this.commuteForm.controls['endTime'].setValue('');
    this.commuteForm.controls['destination'].setValue('');
    this.commuteForm.controls['delayReasonName'].setValue('');
    this.commuteForm.controls['delaySeconds'].setValue('');
    this.commuteForm.controls['fareClass'].setValue('');
    this.commuteForm.controls['route'].setValue('');
  }
}
