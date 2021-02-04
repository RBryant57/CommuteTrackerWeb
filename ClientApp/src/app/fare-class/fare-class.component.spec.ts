import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FareClassComponent } from './fare-class.component';

describe('FareClassComponent', () => {
  let component: FareClassComponent;
  let fixture: ComponentFixture<FareClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FareClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FareClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
