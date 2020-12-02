import { TestBed } from '@angular/core/testing';

import { RouteTypeService } from './route-type.service';

describe('RouteTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RouteTypeService = TestBed.get(RouteTypeService);
    expect(service).toBeTruthy();
  });
});
