import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
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
    {
      path: 'details/:id',
      component: DetailsComponent,
      title: 'Home details'
    }
  ];
  
  export default routeConfig;