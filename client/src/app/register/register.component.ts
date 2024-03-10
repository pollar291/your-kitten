import { Component, inject } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RegisterService } from './register.service';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RegisterRequest } from './register-request.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUpdaterService } from '../auth/auth-updater.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [RegisterService],
})
export class RegisterComponent {
  constructor(
    private router: Router,
    private authUpdaterService: AuthUpdaterService,
    private registerService: RegisterService
  ) {}

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [Validators.required]);
  repeatPasswordFormControl = new FormControl('', [Validators.required]);

  errorServerText: string | null = null;

  ngOnInit() {
    if (this.authUpdaterService.isAuth) {
      this.router.navigateByUrl('/');
    }
  }

  registration() {
    if (
      !this.emailFormControl.valid ||
      !this.passwordFormControl.valid ||
      !this.repeatPasswordFormControl
    ) {
      return;
    }

    if (
      this.passwordFormControl.value!.toString() !==
      this.repeatPasswordFormControl.value!.toString()
    ) {
      this.errorServerText = 'Пароли не совпадают!';
      return;
    }

    this.registerService
      .registration(
        new RegisterRequest(
          this.emailFormControl.value!.toString(),
          this.passwordFormControl.value!.toString()
        )
      )
      .then(
        (response) => {
          if (response.error && response.error === 'user_exists') {
            this.errorServerText = 'Такой пользователь уже существует!';
          } else {
            this.router.navigateByUrl('/auth');
          }
        },
        (error) => {
          this.errorServerText = 'Ошибка сервера!';
        }
      )
      .catch((err) => {
        this.errorServerText = 'Ошибка сервера!';
      });
  }
}
