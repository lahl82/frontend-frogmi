import { TestBed } from '@angular/core/testing';

import { FeaturesService } from './features.service';

describe('ServicesService', () => {
  let feature: FeaturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    feature = TestBed.inject(FeaturesService);
  });

  it('should be created', () => {
    expect(feature).toBeTruthy();
  });
});
