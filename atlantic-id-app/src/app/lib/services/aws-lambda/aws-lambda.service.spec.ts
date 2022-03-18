import { TestBed } from '@angular/core/testing';

import { AwsLambdaService } from './aws-lambda.service';

describe('AwsLambdaService', () => {
  let service: AwsLambdaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwsLambdaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
