import { ApplicationConfig } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthHttpInterceptor, provideAuth0 } from '@auth0/auth0-angular';
import { environment } from '../environments/environment';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const domain = environment.AUTH0_DOMAIN;
const clientId = environment.AUTH0_CLIENT_ID;

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    provideRouter(routes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(withInterceptorsFromDi()),
    provideAuth0({
      domain: domain,
      clientId: clientId,
      authorizationParams: {
        audience: environment.AUTH0_AUDIENCE,
        redirect_uri: environment.redirectUri
      },
      httpInterceptor: {
        allowedList: [{ uri: `${environment.api_url}/user/*` },
          { uri: `${environment.api_url}/booking*` },
          { uri: `${environment.api_url}/servicetype/*` },
          { uri: `${environment.api_url}/user` },
          { uri: `${environment.api_url}/booking` },]
      }
    }), provideAnimationsAsync(),
  ]
};
