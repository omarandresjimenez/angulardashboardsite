import { Injectable } from '@angular/core';
import {
          CanActivate,
          ActivatedRouteSnapshot,
          RouterStateSnapshot,
          Router
} from '@angular/router';
import {LoginService} from './login.service';

@Injectable()
export class LoginRouteGuardService implements CanActivate {
  constructor(private router: Router,
              private loginService: LoginService) {

  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.loginService.isLoggedIn;
  }


}
