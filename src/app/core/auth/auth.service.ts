import {computed, inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient, HttpParams, HttpStatusCode} from "@angular/common/http";
import {Location} from "@angular/common";
import {filter, Observable, switchMap} from "rxjs";
import {State} from "../model/state.model";
import {User} from "../model/user.model";
import {environment} from "../../../environments/environment";
import {AuthService as Auth0Service} from "@auth0/auth0-angular";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient);

  location = inject(Location);

  auth0Service = inject(Auth0Service);

  notConnected = "NOT_CONNECTED";

  accessToken: string | undefined;

  private fetchUser$: WritableSignal<State<User>> =
    signal(State.Builder<User>().forSuccess({email: this.notConnected}));
  fetchUser = computed(() => this.fetchUser$());

  fetch(forceResync: boolean): void {
    this.fetchHttpUser(forceResync)
      .subscribe({
        next: user => this.fetchUser$.set(State.Builder<User>().forSuccess(user)),
        error: err => {
          if (err.status === HttpStatusCode.Unauthorized && this.isAuthenticated()) {
            this.fetchUser$.set(State.Builder<User>().forSuccess({email: this.notConnected}));
          } else {
            this.fetchUser$.set(State.Builder<User>().forError(err));
          }
        }
      })
  }

  login(): void {
    this.auth0Service.loginWithRedirect();
  }

  renewAccessToken(): void {
   this.auth0Service.getAccessTokenSilently({cacheMode: "off"})
     .subscribe(token => {
       this.accessToken = token;
       this.fetch(true);
     });
  }

  initAuthentication(): void {
    this.auth0Service.isAuthenticated$.pipe(
      filter(isLoggedIn => isLoggedIn),
      switchMap(() => this.auth0Service.getAccessTokenSilently()),
    ).subscribe(token => {
      this.accessToken = token;
      this.fetch(false);
    });
  }

  logout(): void {
    this.auth0Service.logout();
  }

  isAuthenticated(): boolean {
    if (this.fetchUser$().value) {
      return this.fetchUser$().value!.email !== this.notConnected;
    } else {
      return false;
    }
  }

  fetchHttpUser(forceResync: boolean): Observable<User> {
    const params = new HttpParams().set('forceResync', forceResync);
    return this.http.get<User>(`${environment.API_URL}/auth/get-authenticated-user`, {params})
  }

  hasAnyAuthority(authorities: string[] | string): boolean {
    if(this.fetchUser$().value!.email === this.notConnected) {
      return false;
    }
    if(!Array.isArray(authorities)) {
      authorities = [authorities];
    }
    return this.fetchUser$().value!.authorities!
      .some((authority: string) => authorities.includes(authority));
  }
}
