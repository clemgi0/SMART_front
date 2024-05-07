import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  url: string = 'https://04dc-134-214-58-15.ngrok-free.app';

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
