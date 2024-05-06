import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  url: string = 'http://localhost:8000';

  constructor() { }

  async register(login: string, password: string) {
    const response = await fetch(this.url + '/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ login, password })
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to register.');
    }
  }
}
