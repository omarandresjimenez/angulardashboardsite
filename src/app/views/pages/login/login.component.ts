import { Component } from '@angular/core';
import {LoginService} from './login.service';


@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  private error: string;
public constructor(private loginService: LoginService) {
}
public onLogIn(userName: string, password: string): void {
  console.log(userName);
    const resp = this.loginService.logIn(userName, password);
    if (resp === '') {
      this.error = 'error';
    } else {
      this.error = '';
    }
}


}
