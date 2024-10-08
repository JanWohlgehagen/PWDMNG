import { Routes } from '@angular/router';
import { vaultGuard } from './pages/vault/vault.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component'),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component'),
  },
  {
    path: 'vault',
    loadComponent: () => import('./pages/vault/vault.component'),
    canActivate: [vaultGuard],
  },
  {
    path: '**',
    loadComponent: () => import('./pages/login/login.component'),
  },
];
