import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// --- PAGE COMPONENTS ---
import { HomeComponent } from "./pages/home/home.component";
import { RedirectComponent } from './pages/redirect/redirect.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'Home Component'}
  },
  {
    path: 'rediect',
    component: RedirectComponent,
    data: { title: 'Redirect Component'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
