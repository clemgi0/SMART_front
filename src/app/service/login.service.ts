import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = 'http://localhost:8000';

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
