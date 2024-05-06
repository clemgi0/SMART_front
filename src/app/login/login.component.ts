import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('a'),
    password: new FormControl('a'),
  });
  loginService: LoginService = inject(LoginService);
  router: Router = inject(Router);

  constructor() {}

  async login() {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    if (username && password && await this.loginService.testLogin(username!, password!)) {
      const user = await this.loginService.getUserByUsername(username!);

      console.log(`${username} logged in with id ${user.id}.`);
      this.router.navigate(['/map'], { queryParams: { id: user.id } });

      return;
    }

    console.log(`${username} not logged in.`);  
  }
}