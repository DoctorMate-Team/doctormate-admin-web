import { Routes } from '@angular/router';
import { Login } from './login/login';
import { OverviewDashboard } from './overview-dashboard/overview-dashboard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'overview-dashboard', component: OverviewDashboard }
];
