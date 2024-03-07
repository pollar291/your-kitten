import { Component, Input } from '@angular/core';
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PosterMainResponse } from '../poster-main-response.model';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poster-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NgIf, MatIconModule],
  templateUrl: './poster-card.component.html',
  styleUrl: './poster-card.component.css',
})
export class PosterCardComponent {
  @Input() poster!: PosterMainResponse;

  constructor(private router: Router) { }

  getImageUrl() {
    if (this.poster.images?.[0]) {
      return (
        'http://127.0.0.1:5000/poster_image?image_id=' +
        this.poster?.images?.[0] +
        '&last_modified=' +
        Math.floor(Date.now() / 1000)
      );
    } else {
      return null;
    }
  }

  openClick() {
    this.router.navigateByUrl("/poster-details/" + this.poster.id)
  }
}
