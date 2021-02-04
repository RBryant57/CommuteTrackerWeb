import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelayReasonComponent } from './delay-reason.component';

describe('DelayReasonComponent', () => {
  let component: DelayReasonComponent;
  let fixture: ComponentFixture<DelayReasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelayReasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelayReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
