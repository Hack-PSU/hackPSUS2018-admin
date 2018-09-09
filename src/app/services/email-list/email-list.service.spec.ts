import { TestBed, inject } from '@angular/core/testing';

import { EmailListService } from './email-list.service';

describe('EmailListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmailListService]
    });
  });

  it('should be created', inject([EmailListService], (service: EmailListService) => {
    expect(service).toBeTruthy();
  }));
});
