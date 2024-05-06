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

        console.log(`${username} logged in with access token ${user.access_token} and id ${user.user_id}.`);
        this.router.navigate(['/map'], { queryParams: { user_id: user.user_id, access_token: user.access_token} });

        // const res = await this.loginService.getHome(user.access_token);
        // console.log(`Here are his home coordinates: lat ${res[0].latitude} and long ${res[0].longitude}`);
      } catch (error) {
        console.log(`Failed to log in: ${error}`);
      }

    } else {
      console.log('Username and password are required.');
    }
  }
}