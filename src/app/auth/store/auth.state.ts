import { State, Action, StateContext, Selector } from '@ngxs/store';
// import { Auth } from './../store/auth.action';
import { AuthService } from './../service/auth.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Login, Register } from './auth.action';

export class AuthStateModel {
  accessToken: string;
  loggedIn: boolean;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: { accessToken: null, loggedIn: false },
})
@Injectable()
export class AuthState {
  constructor(private authService: AuthService, private router: Router) {}

  @Selector()
  static getLoggedinState(state: AuthStateModel) {
    return state.loggedIn;
  }

  @Selector()
  static getAccessToken(state: AuthStateModel) {
    return state.accessToken;
  }

  @Action(Register)
  handleRegister(
    { getState, setState }: StateContext<AuthStateModel>,
    { payload }: Register
  ) {
    return this.authService.handleOnSingup(payload).pipe(
      tap((result) => {
        // this.router.navigateByUrl('/login');
      })
    );
  }

  @Action(Login)
  handleLogin(
    { getState, setState }: StateContext<AuthStateModel>,
    { payload }: Login
  ) {
    return this.authService.handleOnLogin(payload).pipe(
      tap((result: any) => {
        console.log('login result value', result);
        const state = getState();
        setState({
          ...state,
          accessToken: result?.access_token,
          loggedIn: true,
        });
      })
    );
  }
}
