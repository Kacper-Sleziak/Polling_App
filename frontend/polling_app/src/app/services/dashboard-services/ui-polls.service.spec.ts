import { TestBed } from '@angular/core/testing';

import { UiPollsService } from './ui-polls.service';

describe('UiPollsService', () => {
  let service: UiPollsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiPollsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
