import { TestBed } from '@angular/core/testing';

import { PayoutRequestService } from './payout-request.service';

describe('PayoutRequestService', () => {
  let service: PayoutRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayoutRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
