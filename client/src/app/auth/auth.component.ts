import { Component, inject } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './auth.service';
import { AuthRequest } from './auth-request.model';
import { AuthUpdaterService } from './auth-updater.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgIf,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  providers: [AuthService],
})
export class AuthComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private authUpdaterService: AuthUpdaterService
  ) {}

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [Validators.required]);
  errorServerText?: string | null = null;

  ngOnInit() {
    if (this.authUpdaterService.isAuth) {
      this.router.navigateByUrl('/');
    }
  }

  login() {
    if (!this.emailFormControl.valid || !this.passwordFormControl.valid) {
      return;
    }

    let email = this.emailFormControl.value!.toString();

    this.authService
      .login(new AuthRequest(email, this.passwordFormControl.value!.toString()))
      .then(
        (response) => {
          if (
            response.error &&
            response.error === 'uncorrect_login_or_password'
          ) {
            this.errorServerText = 'Неправильный логин или пароль!';
            return;
          }
          this.errorServerText = null;
          this.authUpdaterService.setAuthData(response.token, email);
          this.router.navigateByUrl('/');
        },
        (error) => {
          this.errorServerText = 'Не удалось авторизоваться';
        }
      )
      .catch((err) => {
        this.errorServerText = 'Не удалось авторизоваться';
      });
  }
}
