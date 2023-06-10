import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { LoginResponse, User } from '../interfaces/login-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  login(userName: string, password: string): Observable<number> {
    const url = `${this.baseUrl}/account/login`;
    const body = { userName, password };

    return this.http.post<LoginResponse>(url, body).pipe(
      tap((resp) => {
        if (resp.Status) {
          localStorage.setItem('token', resp.Token!);
          console.log(resp.Status, resp.Token);
        }
      }),
      map((resp) => resp.Status),
      catchError((err) => throwError(() => err.error.error))
    );
  }
}
