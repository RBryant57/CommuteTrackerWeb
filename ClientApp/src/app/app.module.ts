import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { RouteComponent } from './route/route.component';
import { RouteTypeComponent } from './route-type/route-type.component';
import { CommuteComponent } from './commute/commute.component';
import { DestinationComponent } from './destination/destination.component';
import { DelayReasonComponent } from './delay-reason/delay-reason.component';
import { DropdownModule } from 'primeng/dropdown';
import { FareClassComponent } from './fare-class/fare-class.component';
import { PassConditionComponent } from './pass-condition/pass-condition.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    RouteComponent,
    RouteTypeComponent,
    CommuteComponent,
    DestinationComponent,
    DelayReasonComponent,
    FareClassComponent,
    PassConditionComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'route', component: RouteComponent },
      { path: 'route/:id', component: RouteComponent },
      { path: 'routetype', component: RouteTypeComponent },
      { path: 'routetype/:id', component: RouteTypeComponent },
      { path: 'commute', component: CommuteComponent },
      { path: 'destination', component: DestinationComponent },
      { path: 'destination/:id', component: DestinationComponent },
      { path: 'delayreason', component: DelayReasonComponent },
      { path: 'delayreason/:id', component: DelayReasonComponent },
      { path: 'fareclass', component: FareClassComponent },
      { path: 'fareclass/:id', component: FareClassComponent },
      { path: 'passcondition', component: PassConditionComponent },
      { path: 'passcondition/:id', component: FareClassComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
