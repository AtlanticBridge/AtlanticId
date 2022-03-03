import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// --- PAGE COMPONENTS ---
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from './components/login/login.component';
import { RedirectComponent } from './pages/redirect/redirect.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
