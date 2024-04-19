import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {map} from "rxjs";

export const authorityRouteAccess: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  return authService.fetchHttpUser(false).pipe(
    map(connectedUser => {
      if (connectedUser) {
        const authorities = next.data['authorities'];
        return !authorities || authorities.length === 0 || authService.hasAnyAuthority(authorities);
      }
      authService.login();
      return false;
    })
  );
}
