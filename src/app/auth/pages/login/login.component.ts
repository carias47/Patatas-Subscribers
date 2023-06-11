import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoginUser } from '../../interfaces/login-usuario.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user!: LoginUser;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  public myForm: FormGroup = this.fb.group({
    userName: ['patata', [Validators.required]],
    password: ['MrPotat0', [Validators.required, Validators.minLength(7)]],
  });

  login() {
    const { userName, password } = this.myForm.value;
    this.authService.login(userName, password).subscribe({
      next: () => this.router.navigateByUrl('/subscribers'),
      error: (message) => {
        Swal.fire('Error', message, 'error');
      },
    });
  }
}
