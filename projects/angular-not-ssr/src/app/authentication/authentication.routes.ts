import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from '../shares/guard/auth.guard';

export const routes: Routes = [
  {
    path:'login',
    component:LoginComponent,
    canActivate:[authGuard]
  }
];
