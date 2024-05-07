import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  url: string = 'https://04dc-134-214-58-15.ngrok-free.app';

  constructor() { }

  async getHistoryPosition(access_token: string, tracker_id: number) {
    const response = await fetch(this.url + '/history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },
      body: JSON.stringify({
        tracker_id
      })
    });

    return response.json();
  }
}
