import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';

const routeConfig: Routes = [
    {
      path: '',
      component: LoginComponent,
      title: 'Login'
    },
    {
      path: 'map/:id',
      component: MapComponent,
      title: 'Map'
    },
  ];
  
  export default routeConfig;