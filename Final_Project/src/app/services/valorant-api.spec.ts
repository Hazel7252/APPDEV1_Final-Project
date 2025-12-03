import { TestBed } from '@angular/core/testing';

import { ValorantApi } from './valorant-api';

describe('ValorantApi', () => {
  let service: ValorantApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValorantApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
