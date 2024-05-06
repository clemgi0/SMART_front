import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../service/register.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    username: new FormControl('jacques'),
    password: new FormControl('chirac'),
  });
  registerService: RegisterService = inject(RegisterService);
  router: Router = inject(Router);

  constructor() {}

  async register() {
    var user;
    const username = this.registerForm.get('username')?.value;
    const password = this.registerForm.get('password')?.value;

    if (username && password) {
      user = await this.registerService.register(username, password);

      try {
        const user = await this.registerService.register(username, password);

        this.router.navigate([''])
      } catch (error) {
        console.log(`Failed to register: ${error}`);
      }

    } else {
      console.log('Username and password are required.');
    }
  }
}