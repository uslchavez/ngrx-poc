import { Component, OnInit } from '@angular/core';

import { LoginDTO } from '../../model';

@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss'],
})
export class LoginContainerComponent implements OnInit {
  ngOnInit(): void {}

  onLogin(loginDto: LoginDTO) {}

  onRegister(loginDto: LoginDTO) {}
}
