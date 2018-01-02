import { AuthUser } from './../../share/model/auth-user';
import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../views/pages/login/login.service';
import { Subject } from 'rxjs/Subject';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  private currentUser$: Subscription;
  private cUser: AuthUser;
  constructor(private serviceLogin: LoginService) {}

  public ngOnInit() {
    this.currentUser$ = this.serviceLogin.currentUser$.subscribe(
      (user) => {
       this.cUser = user;
      }
    )
  }
  public ngOnDestroy() {
    this.currentUser$.unsubscribe();
  }
  private logOut(): void {
    this.serviceLogin.logOut();
  }
 }
