import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassConditionComponent } from './pass-condition.component';

describe('PassConditionComponent', () => {
  let component: PassConditionComponent;
  let fixture: ComponentFixture<PassConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
