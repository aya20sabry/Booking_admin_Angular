import { TestBed } from '@angular/core/testing';

import { OwnerBalanceService } from './owner-balance.service';

describe('OwnerBalanceService', () => {
  let service: OwnerBalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnerBalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
