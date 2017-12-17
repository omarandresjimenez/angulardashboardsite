import { Component } from '@angular/core';
import {LoginService} from '../../views/pages/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {
  constructor(private serviceLogin: LoginService) {}

  private logOut(): void {
    this.serviceLogin.logOut();
  }
 }
