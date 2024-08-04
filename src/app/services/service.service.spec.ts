import { TestBed } from '@angular/core/testing';

import { ServicesService } from './service.services';

describe('ServiceService', () => {
  let service: ServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
