import { Routes } from '@angular/router';
import { AuthLayout } from '../../layouts/auth-layout/auth-layout';
import { Login } from './login/login';
import { Register } from './register/register';


export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
        { path: '', redirectTo: 'login', pathMatch: 'full' },
        { path: 'login', component: Login },
        { path: 'register', component: Register },
    ]
  }
];
