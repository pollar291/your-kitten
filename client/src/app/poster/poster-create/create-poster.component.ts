import { AuthUpdaterService } from './../../auth/auth-updater.service';
import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { CreatePosterService } from './create-poster.service';
import { CreatePosterRequest } from './create-poster-request.model';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';

@Component({
  selector: 'poster-create',
  standalone: true,
  providers: [CreatePosterService],
  imports: [
    FormsModule,
    MatInputModule,
    MatGridListModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatIconModule,
    NgFor,
    NgIf
  ],
  templateUrl: './create-poster.component.html',
  styleUrl: './create-poster.component.css',
})
export class PosterCreateComponent {
  constructor(
    private router: Router,
    private createPosterService: CreatePosterService,
    private authUpdaterService: AuthUpdaterService
  ) {}

  titleFormControl = new FormControl('', [Validators.required]);
  nameFormControl = new FormControl('', [Validators.required]);
  addressFormControl = new FormControl('', [Validators.required]);
  phoneFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('', [Validators.required]);

  errorServerText: string | null = null;

  images: any[] = [];
  files: any[] = [];

  ngOnInit() {
    if (!this.authUpdaterService.isAuth) {
      this.router.navigateByUrl('/');
    }
  }

  onFileSelected(event: any) {
    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.images.push(e.target.result);
        this.files.push(event.target.files[0]);
      };

      reader.readAsDataURL(event.target.files[0]);
      this.errorServerText = null
    }
  }

  createPost() {
    if(
      !this.titleFormControl.valid ||
      !this.nameFormControl.valid ||
      !this.addressFormControl.valid ||
      !this.phoneFormControl.valid ||
      !this.descriptionFormControl.valid
    ) {
      return;
    }

    if (this.files.length == 0) {
      this.errorServerText = "Загрузите хотябы одну фотографию!"
      return;
    } else {
      this.errorServerText = null
    }

    this.createPosterService
      .createPoster(
        new CreatePosterRequest(
          this.titleFormControl.value!.toString(),
          this.nameFormControl.value!.toString(),
          this.addressFormControl.value!.toString(),
          this.phoneFormControl.value!.toString(),
          this.descriptionFormControl.value!.toString()
        )
      )
      .then(
        (response) => {
          let posterId = response.id;

          this.createPosterService
            .createPosterImage(posterId, this.files)
            .then(
              (response) => {
                this.router.navigateByUrl('/poster-details/' + posterId);
              },
              (error) => {
                console.log(error);
              }
            )
            .catch((err) => {
              console.log(err);
            });
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      )
      .catch((error) => {
        console.log(error);
      });
  }
}
