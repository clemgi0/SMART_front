import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { MapComponent } from './component/map/map.component';
import { ListTrackerComponent } from './component/list-tracker/list-tracker.component';
import { AddTrackerComponent } from './component/add-tracker/add-tracker.component';

const routeConfig: Routes = [
    {
      path: '',
      component: LoginComponent,
      title: 'Login'
    },
    {
      path: 'register',
      component: RegisterComponent,
      title: 'Register'
    },
    {
      path: 'list-tracker',
      component: ListTrackerComponent,
      title: 'List Tracker'
    },
    {
      path: 'map',
      component: MapComponent,
      title: 'Map'
    },
    {
      path: 'add-tracker',
      component: AddTrackerComponent,
      title: 'Add Tracker'
    }
  ];
  
  export default routeConfig;