import { Routes } from '@angular/router';
import { GetstartedComponent } from './component/getstarted-component/getstarted-component';
import { LoginComponent } from './component/login-component/login-component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: GetstartedComponent,
  },
  {
    path: 'home',
    component: GetstartedComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
