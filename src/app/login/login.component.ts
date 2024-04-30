import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
  <section>
    <form [formGroup]="loginForm" (submit)="login()">
      <input type="username" placeholder="Username" formControlName="username">
      <input type="password" placeholder="Password" formControlName="password">
      <button class="primary" type="submit">Login</button>
    </form>
  </section>
`,
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  loginService: LoginService = inject(LoginService);

  constructor() {}

  async login() {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    if (username && password && await this.loginService.testLogin(username!, password!)) {
      console.log(`${username} logged in.`);  

      return;
    }

    console.log(`${username} not logged in.`);  
  }
}