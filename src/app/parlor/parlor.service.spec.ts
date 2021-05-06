import { TestBed } from '@angular/core/testing';

import { ParlorService } from './parlor.service';

describe('ParlorService', () => {
  let service: ParlorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParlorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
