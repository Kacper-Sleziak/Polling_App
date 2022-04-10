import { TestBed } from '@angular/core/testing';

import { QuestionViewModelService } from './question-view-model.service';

describe('QuestionViewModelService', () => {
  let service: QuestionViewModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionViewModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
