import { TestBed } from '@angular/core/testing';

import { FareClassService } from './fare-class.service';

describe('FareClassService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FareClassService = TestBed.get(FareClassService);
    expect(service).toBeTruthy();
  });
});
