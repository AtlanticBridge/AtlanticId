import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// --- PAGE COMPONENTS ---
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from './components/login/login.component';
import { RedirectComponent } from './pages/redirect/redirect.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuardService } from './lib/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'Home Component'}
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login Component'}
  },
  {
    path: 'redirect',
    component: RedirectComponent,
    data: { title: 'Redirect Component'}
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Dashboard Component' },
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
