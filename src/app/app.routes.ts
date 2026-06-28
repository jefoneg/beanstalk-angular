import { Routes } from "@angular/router";
import { RoutesEnum } from "../enums/routes.enum";
import { ForgotpasswordComponent } from "./component/forgotpassword-component/forgotpassword-component";
import { GetstartedComponent } from "./component/getstarted-component/getstarted-component";
import { HomeComponent } from "./component/home-component/home-component";
import { LoginComponent } from "./component/login-component/login-component";
import { RegisterComponent } from "./component/register-component/register-component";
import { cafeResolver } from "./resolver/cafe.resolver";
import { authGuard } from "./guard/auth-guard";

export const routes: Routes = [
  {
    path: RoutesEnum.FullPath,
    pathMatch: "full",
    component: GetstartedComponent,
  },
  {
    path: RoutesEnum.Login,
    component: LoginComponent,
  },
  {
    path: RoutesEnum.Register,
    component: RegisterComponent,
  },
  {
    path: RoutesEnum.Home,
    component: HomeComponent,
    canActivate: [authGuard],
    resolve: {
      cafes: cafeResolver,
    },
  },
  {
    path: RoutesEnum.ForgotPassword,
    component: ForgotpasswordComponent,
  },
];
