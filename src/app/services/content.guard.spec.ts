import { TestBed } from '@angular/core/testing';

import { ContentGuard } from './content.guard';

describe('ContentGuard', () => {
  let guard: ContentGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ContentGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
