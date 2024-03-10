import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PosterDetailsService } from './poster-details.service';
import { PosterDetailsResponse } from './poster-details-response.model';
import { MatGridListModule } from '@angular/material/grid-list';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { PosterDetailsImageDialogComponent } from './poster-details-image-dialog/poster-details-image-dialog.component';
import { BaseApiService } from '../../base-api.service';

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
    DialogModule,
  ],
  templateUrl: './poster-details.component.html',
  styleUrl: './poster-details.component.css',
})
export class PosterDetailsComponent {
  posterId: string = '';
  poster!: PosterDetailsResponse;
  posterImages: String[] = [];

  constructor(
    private api: BaseApiService,
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
          this.poster = response;
          this.posterImages = this.poster.images.map((imageId) =>
            this.api.createImageUrl(imageId.toString())
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
        imageUrl: imageUrl,
      },
    });
  }
}
