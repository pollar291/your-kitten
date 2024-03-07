import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PosterDetailsService } from './poster-details.service';
import { PosterDetailsResponse } from './poster-details-response.model';
import { MatGridListModule } from '@angular/material/grid-list';
import {Dialog, DIALOG_DATA, DialogModule} from '@angular/cdk/dialog';
import { PosterDetailsImageDialogComponent } from './poster-details-image-dialog/poster-details-image-dialog.component';

@Component({
  selector: 'app-poster-details',
  standalone: true,
  providers: [PosterDetailsService],
  imports: [
    MatCardModule,
    MatButtonModule,
    NgIf,
    NgFor,
    MatIconModule,
    MatGridListModule,
    DialogModule
  ],
  templateUrl: './poster-details.component.html',
  styleUrl: './poster-details.component.css',
})
export class PosterDetailsComponent {
  posterId: string = '';
  poster!: PosterDetailsResponse;
  posterImages: String[] = [];

  constructor(
    public dialog: Dialog,
    private posterDetailsService: PosterDetailsService
  ) {}

  ngOnInit() {}

  @Input()
  set id(posterId: string) {
    this.posterId = posterId;

    this.posterDetailsService
      .getPosterById(this.posterId)
      .then(
        (response) => {
          console.log(response);
          this.poster = response;
          this.posterImages = this.poster.images.map(
            (i) =>
              'http://127.0.0.1:5000/poster_image?image_id=' +
              i +
              '&last_modified=' +
              Math.floor(Date.now() / 1000)
          );
        },
        (error) => {
          console.log(error);
        }
      )
      .catch((err) => {
        console.log(err);
      });
  }

  openDialog(imageUrl: String) {
    this.dialog.open(PosterDetailsImageDialogComponent, {
      minWidth: '300px',
      data: {
        imageUrl: imageUrl
      },
    });
  }
}
