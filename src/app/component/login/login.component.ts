import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../service/login.service';
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
    username: new FormControl('jacques'),
    password: new FormControl('chirac'),
  });
  loginService: LoginService = inject(LoginService);
  router: Router = inject(Router);

  constructor() {}

  async login() {
    var user;
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    if (username && password) {
      user = await this.loginService.testLogin(username, password);

      try {
        const user = await this.loginService.testLogin(username, password);

        const userJson = JSON.stringify(user);
        this.router.navigate(['/list-tracker'], { queryParams: { user: userJson} })
      } catch (error) {
        console.log(`Failed to log in: ${error}`);
      }

    } else {
      console.log('Username and password are required.');
    }
  }
}