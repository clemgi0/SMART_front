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

  async getHome(access_token: string) {
    const response = await fetch(this.url + '/getalerttrackers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      }
    });
      
    return response.json();
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

    var foundUser = data.find((user: any) => user.id === id);
    if (!foundUser) {
      foundUser = data.find((user: any) => user.id === parseInt(id));
    }

    return foundUser;
  }
}
