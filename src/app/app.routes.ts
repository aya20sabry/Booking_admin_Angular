import { Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ApprovedListComponent } from './Components/approved-list/approved-list.component';
import { ApartmentListComponent } from './Components/apartment-list/apartment-list.component';
import { VisitorChartComponent } from './Components/visitors-chart/visitors-chart.component';
import { LoginComponent } from './Components/login/login.component';
import { EarningChartComponent } from './Components/earning-chart/earning-chart.component';
import { DetailsComponent } from './Components/details/details.component';
import { userauthGuard } from './Guards/guards.service';
import { MainlayoutComponent } from './Components/mainlayout/mainlayout.component';
import { UsersListComponent } from './Components/users-list-control/users-list-control.component';
export const routes: Routes = [
  {
    path: '',
    component: MainlayoutComponent,
    children: [
      { path: '', component: DashboardComponent, pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'approved-list', component: ApprovedListComponent },
      { path: 'apartment-list', component: ApartmentListComponent },
      { path: 'earning-chart', component: EarningChartComponent },
      { path: 'users-list-control', component: UsersListComponent },
      { path: 'visitors-chart', component: VisitorChartComponent },
      { path: 'approved-list/details/:id', component: DetailsComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/dashboard' },
];
