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
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
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
  constructor(private registerService: RegisterService) {}

  route: ActivatedRoute = inject(ActivatedRoute);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [Validators.required]);

  repeatPasswordFormControl = new FormControl('', [Validators.required]);

  registration() {
    // if (
    //   this.passwordFormControl.value!.toString() ===
    //   this.repeatPasswordFormControl.value!.toString()
    // ) {
    //   // TODO show error
    //   return;
    // }

    this.registerService
      .login(
        new RegisterRequest(
          this.emailFormControl.value!.toString(),
          this.passwordFormControl.value!.toString()
        )
      )
      .then(
        (response) => {
          localStorage.setItem('token', response.uuid);
        },
        (error) => {
          console.log(error);
        }
      )
      .catch((err) => {
        console.log(err);
      });
  }
}
