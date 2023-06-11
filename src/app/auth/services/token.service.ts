import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }
  setToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }
  setRefreshToken(refreshToken: string) {
    localStorage.setItem('refreshToken', refreshToken);
  }
  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }
  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }
  logout(): void {
    localStorage.clear();
  }
}
