import { TestBed } from '@angular/core/testing';

import { Recharges } from './recharges';

describe('Recharges', () => {
  let service: Recharges;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Recharges);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
