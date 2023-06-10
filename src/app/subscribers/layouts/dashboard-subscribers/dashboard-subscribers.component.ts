import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TokenService } from 'src/app/auth/services/token.service';

@Component({
  selector: 'app-dashboard-subscribers',
  templateUrl: './dashboard-subscribers.component.html',
  styleUrls: ['./dashboard-subscribers.component.css'],
})
export class DashboardSubscribersComponent {
  isLogged: boolean = false;
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}
  ngOnInit() {
    this.tokenService.isLogged()
      ? (this.isLogged = true)
      : (this.isLogged = false);
  }
  logout(): void {
    this.tokenService.logout();
    this.router.navigate(['/auth']);
  }
}
