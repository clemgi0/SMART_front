import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  url: string = 'http://localhost:8000';

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
