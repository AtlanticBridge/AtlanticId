import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// --- IMPORT MODULES ---
import { MaterialModule } from "./modules/material.module";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavhubComponent } from './components/navhub/navhub.component';
import { RedirectComponent } from "./pages/redirect/redirect.component";
import { NfidCardComponent } from './components/nfid-card/nfid-card.component';
import { UserInfoCardComponent } from './components/user-info-card/user-info-card.component';
import { SettingsComponent } from './pages/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidenavComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    NavhubComponent,
    RedirectComponent,
    NfidCardComponent,
    UserInfoCardComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
