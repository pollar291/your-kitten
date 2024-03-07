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
import { NgFor } from '@angular/common';
import { CreatePosterService } from './create-poster.service';
import { CreatePosterRequest } from './create-poster-request.model';

@Component({
  selector: 'poster-create',
  standalone: true,
  providers: [CreatePosterService],
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatIconModule,
    NgFor,
  ],
  templateUrl: './create-poster.component.html',
  styleUrl: './create-poster.component.css',
})
export class PosterCreateComponent {
  constructor(private createPosterService: CreatePosterService) {}

  titleFormControl = new FormControl('', [Validators.required]);
  addressFormControl = new FormControl('', [Validators.required]);
  phoneFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('', [Validators.required]);

  isImagesLoaded: boolean = false;

  images: any[] = [];
  files: any[] = [];

  ngOnInit() {}

  onFileSelected(event: any) {
    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.images.push(e.target.result);
        this.files.push(event.target.files[0]);
      };

      reader.readAsDataURL(event.target.files[0]);

      if (!this.isImagesLoaded) {
        this.isImagesLoaded = true;
      }
    }
  }

  createPost() {
    this.createPosterService
      .createPoster(
        new CreatePosterRequest(
          this.titleFormControl.value!.toString(),
          this.addressFormControl.value!.toString(),
          this.phoneFormControl.value!.toString(),
          this.descriptionFormControl.value!.toString()
        )
      )
      .then(
        (response) => {
          if (this.files.length == 0) {
            this.isImagesLoaded = false;
            return;
          }

          this.createPosterService
            .createPosterImage(response.id, this.files)
            .then(
              (response) => {
                console.log(response);
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
