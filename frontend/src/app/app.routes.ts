import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component')
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/register/register.component')
    },
    {
        path: 'vault',
        loadComponent: () => import('./pages/vault/vault.component')
    }
];
