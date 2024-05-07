import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddTrackerService {
  url: string = 'http://localhost:8000';

  constructor() { }

  async postNewMonitoring(access_token: string, tracker_id: number, tracker_name: string, watcher_id: number) {
    const response = await fetch(this.url + '/addmonitoring', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },
      body: JSON.stringify({
        watcher_id,
        tracker_id,
        tracker_name
      })
    });
      
    return response.json();
  }
}
