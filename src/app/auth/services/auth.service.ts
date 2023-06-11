import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { LoginResponse } from '../interfaces/login-response.interface';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(userName: string, password: string) {
    const url = `${this.baseUrl}/account/login`;
    const body = { userName, password };

    return this.http.post<LoginResponse>(url, body).pipe(
      tap((resp) => {
        if (resp.Status === 1) {
          const accessToken = resp.Token;
          const refreshToken = resp.RefreshToken;
          this.tokenService.setRefreshToken(refreshToken);
          localStorage.setItem('accessToken', accessToken);
        }
      }),
      map((resp) => resp.Status),
      catchError((err) => of(err.error))
      // map((response) => {
      //   if (response.Status === 1) {
      //     const accessToken = response.Token;
      //     const refreshToken = response.RefreshToken;
      //     console.log(accessToken);
      //     console.log(refreshToken);
      //     this.tokenService.setRefreshToken(refreshToken);
      //     localStorage.setItem('accessToken', accessToken);
      //     return true;
      //   }
      //   return false;
      // })
    );
  }
  refreshToken(): Observable<string | null> {
    const refreshToken = this.tokenService.getRefreshToken();
    return of(refreshToken);
  }
}
