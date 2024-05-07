import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListTrackerService {
  url: string = 'https://04dc-134-214-58-15.ngrok-free.app';

  constructor() { }

  async getListTracker(access_token: string) {
    const response = await fetch(this.url + '/gettrackers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      }
    });
      
    return response.json();
  }
}
