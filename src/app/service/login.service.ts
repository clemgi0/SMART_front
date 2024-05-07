import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = 'https://04dc-134-214-58-15.ngrok-free.app';

  constructor() { }
  
  async testLogin(login: string, password: string) {
    const response = await fetch(this.url + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login,
        password,
      })
    });

    return response.json();
  }
}
