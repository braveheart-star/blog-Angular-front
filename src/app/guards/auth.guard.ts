import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';
import { AuthState } from '../auth/store/auth.state';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate() {
    let access = '';
    this.store.select(AuthState.getAccessToken).subscribe((value) => {
      access = value;
    });

    console.log('access token in the authguard', access);
    if (access !== null) return true;
    else return false;
  }
}
