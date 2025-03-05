import { TestBed } from '@angular/core/testing';

import { UserGeneralService } from './user-general.service';

describe('UserGeneralService', () => {
  let service: UserGeneralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserGeneralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
