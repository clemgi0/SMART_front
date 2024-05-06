import { Component, NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ListTrackerService } from '../../service/list-tracker.service';
import { Tracker } from '../../interface/tracker';
import { User } from '../../interface/user';

@Component({
  selector: 'app-list-tracker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-tracker.component.html',
  styleUrl: './list-tracker.component.css'
})
export class ListTrackerComponent {
  listTrackerService: ListTrackerService = inject(ListTrackerService);
  user: User = { id: 0, access_token: '' };
  trackerList: Tracker[] = [];
  router: Router = inject(Router);

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      const jsonObj = JSON.parse(params['user']);
      this.user = jsonObj as User;
    });
  }

  async ngAfterViewInit(): Promise<void> {
    const res = await this.listTrackerService.getListTracker(this.user.access_token);

    res.forEach((tracker: any) => {
      this.trackerList.push({
        id: tracker[0].id,
        status: tracker[0].status,
        home_latitude: tracker[0].latitude,
        home_longitude: tracker[0].longitude,
        name: tracker[1].tracker_name
      });
    });
  }

  showMap(tracker: Tracker): void {
    const trackerJson = JSON.stringify(tracker);
    const userJson = JSON.stringify(this.user);
    this.router.navigate(['/map'], { queryParams: { user: userJson} });
  }
}
