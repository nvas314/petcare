import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthorizeInterceptor } from './interceptor/authorize.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient(withInterceptorsFromDi()),

  {
      provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true
  }, provideAnimationsAsync(), provideAnimationsAsync()
  ]
};
