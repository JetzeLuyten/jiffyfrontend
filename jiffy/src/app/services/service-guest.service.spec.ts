import { TestBed } from '@angular/core/testing';

import { ServiceGuestService } from './service-guest.service';

describe('ServiceGuestService', () => {
  let service: ServiceGuestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceGuestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
