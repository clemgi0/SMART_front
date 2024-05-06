import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { MapComponent } from './component/map/map.component';
import { ListTrackerComponent } from './component/list-tracker/list-tracker.component';

const routeConfig: Routes = [
    {
      path: '',
      component: LoginComponent,
      title: 'Login'
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
  ];
  
  export default routeConfig;