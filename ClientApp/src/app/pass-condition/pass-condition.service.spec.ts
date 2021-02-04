import { TestBed } from '@angular/core/testing';

import { PassConditionService } from './pass-condition.service';

describe('PassConditionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PassConditionService = TestBed.get(PassConditionService);
    expect(service).toBeTruthy();
  });
});
