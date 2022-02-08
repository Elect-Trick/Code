import { TestBed } from '@angular/core/testing';
import { ErrorInterceptor } from './error.interceptor';

describe('ErrosInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ErrorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ErrorInterceptor = TestBed.inject(ErrosInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
