import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteTypeComponent } from './route-type.component';

describe('RouteTypeComponent', () => {
  let component: RouteTypeComponent;
  let fixture: ComponentFixture<RouteTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
