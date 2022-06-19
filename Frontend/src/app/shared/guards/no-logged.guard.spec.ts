import { TestBed } from '@angular/core/testing';

import { NoLoggedGuard } from './no-logged.guard';

describe('NoLoggedGuard', () => {
  let guard: NoLoggedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoLoggedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
