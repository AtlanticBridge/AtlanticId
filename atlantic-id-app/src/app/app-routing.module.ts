import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// --- PAGE COMPONENTS ---
import { HomeComponent } from "./pages/home/home.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'Home Component'}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
