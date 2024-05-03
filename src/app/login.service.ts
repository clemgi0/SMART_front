import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = 'http://localhost:3000/users';

  constructor() { }

  async testLogin(username: string, password: string) {
    const response = await fetch(this.url);
    const data = await response.json();

    if (!data) {
      return false;
    }

    const foundUser = data.find((user: any) => user.username === username && user.password === password);
    if (foundUser) {
      return true;
    }

    return false;
  }

  async getUserByUsername(username: string) {
    const response = await fetch(this.url);
    const data = await response.json();

    const foundUser = data.find((user: any) => user.username === username);

    return foundUser;
  }

  async getUserById(id: string) {
    const response = await fetch(this.url);
    const data = await response.json();

    const foundUser = data.find((user: any) => user.id === parseInt(id));

    return foundUser;
  }
}
