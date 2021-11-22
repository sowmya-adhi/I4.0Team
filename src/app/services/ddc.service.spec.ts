import { TestBed, inject } from '@angular/core/testing';

import { DDCService } from './ddc.service';

describe('DDCService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DDCService]
    });
  });

  it('should be created', inject([DDCService], (service: DDCService) => {
    expect(service).toBeTruthy();
  }));
});
