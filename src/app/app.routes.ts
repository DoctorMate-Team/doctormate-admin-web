import { Routes } from '@angular/router';
import { Login } from './login/login';
import { OverviewDashboard } from './overview-dashboard/overview-dashboard';
import { PaymentDashboard } from './payment-dashboard/payment-dashboard';
import { LogsDashboard } from './logs-dashboard/logs-dashboard';
import { UserDashboard } from './user-dashboard/user-dashboard';
import { HomeDashboard } from './home-dashboard/home-dashboard';
import { RulrsDashboard } from './Action/rulrs-dashboard/rulrs-dashboard';
import { SpecialistsDashboard } from './specialists-dashboard/specialists-dashboard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'overview-dashboard', component: OverviewDashboard /*, canActivate: [authGuard]*/ },
    { path: 'payment-dashboard', component: PaymentDashboard /*, canActivate: [authGuard]*/ },
    { path: 'logs-dashboard', component: LogsDashboard /*, canActivate: [authGuard]*/ },
    { path: 'user-dashboard', component: UserDashboard /*, canActivate: [authGuard]*/ },
    { path: 'home-dashboard', component: HomeDashboard /*, canActivate: [authGuard]*/ },
    { path: 'action-rules-dashboard', component: RulrsDashboard /*, canActivate: [authGuard]*/ },
    { path: 'specialists-dashboard', component: SpecialistsDashboard /*, canActivate: [authGuard]*/ },
    { path: '**', redirectTo: '/overview-dashboard' }
];




