import { TestBed } from '@angular/core/testing';

import { PalsService } from './pals.service';

describe('PalsService', () => {
  let service: PalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
