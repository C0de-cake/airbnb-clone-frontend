import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideHttpClient, withInterceptors, withXsrfConfiguration} from "@angular/common/http";
import {provideAuth0} from "@auth0/auth0-angular";
import {environment} from "../environments/environment";
import {authInterceptor} from "./core/auth/http-auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideAuth0({
      domain: environment.AUTH0_DOMAIN,
      clientId: environment.AUTH0_CLIENT_ID,
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: `${environment.AUTH0_DOMAIN}/api/v2/`,
        scope: `openid profile read:current_user`,
      }
    }),
    provideHttpClient(
      withInterceptors([authInterceptor]),
      withXsrfConfiguration(
        {cookieName: "XSRF-TOKEN", headerName: "X-XSRF-TOKEN"}),
    ),
    provideRouter(routes)
  ]
};
