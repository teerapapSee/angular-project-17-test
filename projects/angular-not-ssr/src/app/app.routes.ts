import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./dashboard/dashboard.routes').then(mod => mod.routes)
  },
  {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.routes').then(mod => mod.routes)
  },
  {
    path: 'component',
    loadChildren: () => import('./component/component.routes').then(mod => mod.routes)
  }
];
