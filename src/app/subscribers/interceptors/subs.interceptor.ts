import { TokenService } from 'src/app/auth/services/token.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, catchError, concatMap, switchMap, throwError } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Injectable()
export class SubsInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    if (!this.tokenService.isLogged()) {
      return next.handle(request);
    }
    const token = this.tokenService.getToken();
    let intReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(intReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          const refreshToken = this.tokenService.getRefreshToken();
          if (refreshToken) {
            return this.authService.refreshToken().pipe(
              switchMap((refreshToken) => {
                this.tokenService.setToken(refreshToken!);

                const newRequest = request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${refreshToken}`,
                  },
                });
                return next.handle(newRequest);
              }),
              catchError((error: HttpErrorResponse) => {
                this.tokenService.logout();
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Session caducated',
                  showConfirmButton: false,
                  timer: 1500,
                });
                this.router.navigate(['/']);
                return throwError(error);
              })
            );
          }
        }

        return throwError(error);
      })
    );
  }
}
export const interceptorProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: SubsInterceptor, multi: true },
];
