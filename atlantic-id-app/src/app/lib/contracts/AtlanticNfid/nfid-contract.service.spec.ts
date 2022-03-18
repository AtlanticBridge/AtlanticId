import { TestBed } from '@angular/core/testing';

import { NfidContractService } from './nfid-contract.service';

describe('NfidContractService', () => {
  let service: NfidContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NfidContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
