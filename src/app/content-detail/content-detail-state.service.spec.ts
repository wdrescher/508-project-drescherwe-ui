import { TestBed } from '@angular/core/testing';

import { ContentDetailStateService } from './content-detail-state.service';

describe('ContentDetailStateService', () => {
  let service: ContentDetailStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentDetailStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
