import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable, BehaviorSubject} from 'rxjs/Rx';
import {Router} from '@angular/router';
import {AuthUser} from '../../../share/model/auth-user';
import {ApiService} from '../../../share/services/api-service';


@Injectable()
export class LoginService {
public redirectUrl: string;
public currentUser$ = new BehaviorSubject<AuthUser>(null);
public currentuser: AuthUser;
public isLoggedIn: boolean;
private apiKey = '243ed9c9fb5e9ac1342c197d091ecf29';
private privateKey = 'a92bf87be61a7e3b77a6a507d284bbe574c33eff';
  constructor(private route: Router, private apiservice: ApiService) {
  }

public logIn(user: string, password: string): string {
  // return  this._http.get();
  // return Observable.create(true);
  const params: any = [];
  const ts = new Date();
  params.push({ key: 'name', value: user });
  params.push({ key: 'apikey', value: this.apiKey });
  params.push({ key: 'ts', value: ts });
  // params.push({ key: 'hash', value: md5(ts + this.apiKey + this.privateKey) });

   this
    .apiservice
    .call('GET', 'https://gateway.marvel.com:443/v1/public/characters', params)
    .then((response) => {
      if (response && response.data.count > 0) {
        this.currentuser = {userName: user,
                            userAvatar: response.data.results[0].thumbnail.path + '/portrait_xlarge.jpg',
                            isLoggedIn: true,
                            authKey: '123'};
        this.isLoggedIn = true;
        this.currentUser$.next(this.currentuser);
        this.route.navigateByUrl('/main')
        return 'ok';
      } else {
        return '';
      }
    })
  return '';
}

  public logOut(): void {
    // return  this._http.get();
    // return Observable.create(true);
    this.isLoggedIn = false;
    this.currentUser$.next(null);
    this.route.navigateByUrl('/login')
  }





}
