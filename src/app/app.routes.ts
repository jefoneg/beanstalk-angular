import { Routes } from '@angular/router';
import { GetstartedComponent } from './component/getstarted-component/getstarted-component';
import { LoginComponent } from './component/login-component/login-component';
import { RoutesEnum } from '../enums/routes.enum';

export const routes: Routes = [
  {
    path: RoutesEnum.FullPath,
    pathMatch: 'full',
    component: GetstartedComponent,
  },
  {
    path: RoutesEnum.Login,
    component: LoginComponent,
  },
];
