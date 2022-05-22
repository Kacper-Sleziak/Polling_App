import { TestBed } from '@angular/core/testing';

import { FormResultService } from './form-result.service';

describe('FormResultService', () => {
  let service: FormResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
