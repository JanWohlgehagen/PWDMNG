import { Routes } from '@angular/router';



export const routes: Routes = [  { path: 'login', loadComponent:  () => import ("./components/login/login.component") },
    { path: '/register', loadComponent: () => import('./components/register/register.component') },
    { path: '/vault', loadComponent: ()=> import('./components/vault/vault.component') },
    { path: '**', redirectTo: 'login' }];
