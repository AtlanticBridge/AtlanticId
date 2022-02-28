import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuardService } from '../core/auth/guards/auth.guard';
// import { AuthService } from './services/auth.service';
// import { RandomGuard } from './guards/random.guard';
import { AuthTokenInterceptor } from '../core/auth/token.interceptor';

@NgModule({
  declarations: [],
  providers: [
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true
    }
  ],
  imports: []
})
export class AuthModule { }