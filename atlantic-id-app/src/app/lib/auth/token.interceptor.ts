import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable, BehaviorSubject } from 'rxjs';

/**
 * 
 * Authenitcation HTTP interceptor that will:
 * 
 * 1. Set authorization HTTP header before making a request
 * 2. update expirsed access tokenand retry failed request.
 * 
 */
@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

    private isRefreshing: boolean = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        private authService: AuthService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (request.url.indexOf('/graphql') > -1) { 
        if (this.authService.getJwtToken() != null) {
            request = this.addToken(request, this.authService.getJwtToken() || '');
            return next.handle(request)
        }
      }
      return next.handle(request);
    }

    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
          setHeaders: {
            'Authorization': `Bearer ${token}`
          }
        });
    }
}