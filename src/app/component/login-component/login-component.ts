import { Component } from '@angular/core';
import { GetStartedConstant } from '../../../constants/get-started.constant';
import { LoginConstant } from '../../../constants/login.constant';

@Component({
  selector: 'app-login-component',
  imports: [],
  templateUrl: './login-component.html',
  styleUrl: './login-component.less',
})
export class LoginComponent {
  protected readonly GetStartedConstant = GetStartedConstant;
  protected readonly LoginConstant = LoginConstant;
}
