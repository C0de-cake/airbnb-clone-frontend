import {TestBed} from '@angular/core/testing';

import {TenantListingService} from './tenant-listing.service';

describe('TenantListingService', () => {
  let service: TenantListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TenantListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
