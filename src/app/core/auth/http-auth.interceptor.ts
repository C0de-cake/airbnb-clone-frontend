import {HttpInterceptorFn} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {inject} from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.accessToken;
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return next(req);
}
