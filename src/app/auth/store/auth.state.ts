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
    { getState, patchState }: StateContext<AuthStateModel>,
    { payload }: Register
  ) {
    return this.authService.handleOnSingup(payload).pipe(
      tap((result) => {
        this.router.navigateByUrl('/login');
      })
    );
  }

  @Action(Login)
  getBlogs(
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

  //   @Action(DeleteBlog)
  //   deleteBlog(
  //     { getState, setState }: StateContext<BlogStateModel>,
  //     { id }: DeleteBlog
  //   ) {
  //     return this.blogService.deleteBlog(id).pipe(
  //       tap((result) => {
  //         const state = getState();
  //         const filteredArray = state.blogs.filter((item) => item.id !== id);
  //         setState({
  //           ...state,
  //           blogs: filteredArray,
  //         });
  //       })
  //     );
  //   }

  //   @Action(UpdateBlog)
  //   updateBlog(
  //     { getState, setState }: StateContext<BlogStateModel>,
  //     { payload, id }: UpdateBlog
  //   ) {
  //     return this.blogService.updateBlog(id, payload).pipe(
  //       tap((result) => {
  //         console.log('result from service, store', result);

  //         const state = getState();
  //         const blogList = [...state.blogs];
  //         const blogIndex = blogList.findIndex((item) => item.id === id);
  //         blogList[blogIndex] = result;

  //         setState({
  //           ...state,
  //           blogs: blogList,
  //         });
  //       })
  //     );
  //   }
}
