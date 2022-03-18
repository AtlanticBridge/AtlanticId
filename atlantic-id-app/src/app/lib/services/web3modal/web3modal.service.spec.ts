import { TestBed } from '@angular/core/testing';

import { Web3modalService } from './web3modal.service';

describe('Web3modalService', () => {
  let service: Web3modalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Web3modalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
