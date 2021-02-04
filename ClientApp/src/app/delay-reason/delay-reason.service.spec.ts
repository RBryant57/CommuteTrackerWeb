import { TestBed } from '@angular/core/testing';

import { DelayReasonService } from './delay-reason.service';

describe('DelayReasonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DelayReasonService = TestBed.get(DelayReasonService);
    expect(service).toBeTruthy();
  });
});
