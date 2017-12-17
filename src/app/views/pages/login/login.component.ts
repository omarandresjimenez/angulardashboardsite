import { Component } from '@angular/core';
import {LoginService} from './login.service';


@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {
public constructor(private loginService: LoginService) {
}
public onLogIn(userName: string, password: string): void {
    this.loginService.logIn(userName, password);
}


}
