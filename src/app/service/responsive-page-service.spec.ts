import { TestBed } from '@angular/core/testing';

import { ResponsivePageService } from './responsive-page-service';

describe('ResponsivePageService', () => {
  let service: ResponsivePageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponsivePageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
