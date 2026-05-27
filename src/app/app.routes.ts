import { Routes } from '@angular/router';
import { GetstartedComponent } from './component/getstarted-component/getstarted-component';

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
];
