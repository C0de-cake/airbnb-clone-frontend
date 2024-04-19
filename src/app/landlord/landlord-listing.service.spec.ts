import {TestBed} from '@angular/core/testing';

import {LandlordListingService} from './landlord-listing.service';

describe('LandlordListingService', () => {
  let service: LandlordListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandlordListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
