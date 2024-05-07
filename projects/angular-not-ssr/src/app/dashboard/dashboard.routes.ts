import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { authGuard } from '../shares/guard/auth.guard';

export const routes: Routes = [
  {
    path:'',
    component:MainComponent,
    canActivate:[authGuard]
  }
];
