import { TestBed, inject } from '@angular/core/testing';

import { HttpAdminService } from './http-admin.service';

describe('HttpAdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpAdminService],
    });
  });

  it('should be created', inject([HttpAdminService], (service: HttpAdminService) => {
    expect(service).toBeTruthy();
  }));
});
