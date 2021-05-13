import { Component, OnInit } from '@angular/core';
import { Route } from '../route/route-model';
import { RouteService } from '../route/route.service';
import { FilterService } from 'primeng/api';
import { DelayReason } from '../delay-reason/delay-reason-model';
import { DelayReasonService } from '../delay-reason/delay-reason.service';
import { FormControl, FormGroup } from '@angular/forms';
import { PassCondition } from './pass-condition-model';
import { AlertService } from '../alert.service';
import { PassConditionService } from './pass-condition.service';

@Component({
  selector: 'app-pass-condition',
  templateUrl: './pass-condition.component.html',
  styleUrls: ['./pass-condition.component.css'],
  providers: [FilterService]
})
export class PassConditionComponent implements OnInit {
  public passConditionForm: FormGroup;
  public routes: Route[];
  public selectedRoute: Route;
  public delayReasons: DelayReason[];
  public selectedDelayReason: DelayReason;
  public time: string;

  private errorMessage: string;


  displayMonths = 2;
  navigation = 'select';
  showWeekNumbers = false;
  outsideDays = 'visible';

  constructor(private passConditionService: PassConditionService, private routeService: RouteService, private delayReasonService: DelayReasonService, private alertService: AlertService) {
    this.passConditionForm = this.createFormGroup();
  }

  ngOnInit() {
    this.loadRoutes();
    this.loadDelayReasons();
  }

  createFormGroup() {
    return new FormGroup({
      date: new FormControl(),
      time: new FormControl(),
      minutes: new FormControl(),
      usualMinutes: new FormControl(),
      delayReasonName: new FormControl(),
      delaySeconds: new FormControl(),
      route: new FormControl(),
      notes: new FormControl()
    });
  }

  public markTime() {
    var newDate = new Date();
    var hours = newDate.getHours().toString().length == 1 ? '0' + newDate.getHours() : newDate.getHours();
    var minutes = newDate.getMinutes().toString().length == 1 ? '0' + newDate.getMinutes() : newDate.getMinutes();
    var seconds = newDate.getSeconds().toString().length == 1 ? '0' + newDate.getSeconds() : newDate.getSeconds();
    this.passConditionForm.controls['time'].setValue(hours + ':' + minutes + ':' + seconds);
  }

  public addPassCondition() {
    var passCondition = new PassCondition();

    var date = this.passConditionForm.controls['date'].value;
    var time = this.passConditionForm.controls['time'].value;
    var startHours = time.slice(0, 2);
    var startMinutes = time.slice(3, 5);
    var startSeconds = time.slice(9);

    passCondition.Date = new Date(date.year, date.month, date.day, startHours, startMinutes, startSeconds);
    passCondition.DelayReason = this.passConditionForm.controls['delayReasonName'].value;
    passCondition.DelayReasonId = passCondition.DelayReason.id;
    passCondition.Route = this.passConditionForm.controls['route'].value;
    passCondition.RouteId = passCondition.Route.id;
    passCondition.Minutes = this.passConditionForm.controls['minutes'].value;
    passCondition.UsualMinutes = this.passConditionForm.controls['usualMinutes'].value;
    passCondition.DelaySeconds = this.passConditionForm.controls['delaySeconds'].value;

    this.passConditionService.postPassCondition(passCondition)
      .subscribe(result => {
        this.alertService.success('Pass condition successfully added.');
        this.clearForm();
      }, error => {
          console.log(error);
        this.alertService.error('Pass condition was not successfully added.');
      });
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

  private clearForm() {
    this.passConditionForm.controls['date'].setValue('');
    this.passConditionForm.controls['time'].setValue('');
    this.passConditionForm.controls['minutes'].setValue('');
    this.passConditionForm.controls['usualMinutes'].setValue('');
    this.passConditionForm.controls['delayReasonName'].setValue('');
    this.passConditionForm.controls['route'].setValue('');
  }
}
