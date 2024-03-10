import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PosterMainResponse } from '../poster-main-response.model';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { BaseApiService } from '../../base-api.service';

@Component({
  selector: 'app-poster-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NgIf, MatIconModule],
  templateUrl: './poster-card.component.html',
  styleUrl: './poster-card.component.css',
})
export class PosterCardComponent {
  @Input() poster!: PosterMainResponse;

  constructor(private api: BaseApiService, private router: Router) {}

  getImageUrl() {
    if (this.poster.images?.[0]) {
      return this.api.createImageUrl(this.poster.images[0].toString());
    } else {
      return null;
    }
  }

  openClick() {
    this.router.navigateByUrl('/poster-details/' + this.poster.id);
  }
}
