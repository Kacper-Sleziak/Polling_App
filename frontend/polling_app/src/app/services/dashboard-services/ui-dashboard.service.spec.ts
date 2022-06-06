import { TestBed } from '@angular/core/testing';

import { UiDashboardService } from './ui-dashboard.service';

describe('UiDashboardService', () => {
  let service: UiDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
