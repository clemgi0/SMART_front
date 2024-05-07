import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { User } from '../../interface/user';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AddTrackerService } from '../../service/add-tracker.service';

@Component({
  selector: 'app-add-tracker',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './add-tracker.component.html',
  styleUrl: './add-tracker.component.css'
})
export class AddTrackerComponent {
  addTrackerForm = new FormGroup({
    name: new FormControl(''),
    id: new FormControl(),
  });
  addTrackerService: AddTrackerService = inject(AddTrackerService);
  router: Router = inject(Router);
  user: User = { id: 0, access_token: '' };

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      const jsonObj = JSON.parse(params['user']);
      this.user = jsonObj as User;
    });
  }

  goBack() {
    const userJson = JSON.stringify(this.user);
    this.router.navigate(['/list-tracker'], { queryParams: { user: userJson} })
  }

  addTracker() {
    const name = this.addTrackerForm.get('name')?.value;
    const id = this.addTrackerForm.get('id')?.value;

    if (name && id) {
      try {
        this.addTrackerService.postNewMonitoring(this.user.access_token, id!, name!, this.user.id);

        const userJson = JSON.stringify(this.user);
        this.router.navigate(['/list-tracker'], { queryParams: { user: userJson} })
      } catch (error) {
        console.log(`Failed to add tracker: ${error}`);
      }

    } else {
      console.log('Name and id are required.');
    }
  }
}
