import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable, BehaviorSubject} from 'rxjs/Rx';
import {Router} from '@angular/router';
import {AuthUser} from '../../../share/model/auth-user';

@Injectable()
export class LoginService {
public redirectUrl: string;
public currentUser$ = new BehaviorSubject<AuthUser>(null);


  constructor(private route: Router) {
  }

public logIn(user: string, password: string): string {
  // return  this._http.get();
  // return Observable.create(true);
  const cUser: AuthUser = {userName: 'userTest', userAvatar: '', isLoggedIn: true, authKey: '123'};

  this.currentUser$.next(cUser);
  this.route.navigateByUrl('/main')
  return 'ok'
}

  public logOut(): void {
    // return  this._http.get();
    // return Observable.create(true);
    this.currentUser$.next(null);
    this.route.navigateByUrl('/login')
  }

  public getCurrentUser(): Observable<AuthUser> {
   return  this.currentUser$.asObservable().take(1);
  }

}
