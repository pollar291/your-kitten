import { RegisterComponent } from './../register/register.component';
import { AuthComponent } from './../auth/auth.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { PosterMainService } from './poster-main.service';
import { PosterMainResponse } from './poster-main-response.model';
import { PosterCardComponent } from './poster-card/poster-card.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { BaseApiService } from '../base-api.service';
import { AuthUpdaterService } from '../auth/auth-updater.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'poster-main',
  standalone: true,
  providers: [PosterMainService],
  imports: [
    RouterOutlet,
    AuthComponent,
    RegisterComponent,
    MatDividerModule,
    MatButtonModule,
    RouterModule,
    MatGridListModule,
    NgIf,
    NgFor,
    PosterCardComponent,
  ],
  template: `
    <button
      *ngIf="isAuth"
      class="create-post-btn"
      routerLink="/create-poster"
      mat-raised-button
      color="accent"
    >
      Создать объявление
    </button>
    <mat-grid-list cols="4">
      <mat-grid-tile *ngFor="let poster of posters">
        <app-poster-card [poster]="poster"></app-poster-card>
      </mat-grid-tile>
    </mat-grid-list>
  `,
  styleUrl: './poster-main.component.css',
})
export class PosterMainComponent {
  constructor(
    private authUpdaterService: AuthUpdaterService,
    private posterMainService: PosterMainService
  ) {}

  private subscriptionUpdater!: Subscription;

  isAuth = this.authUpdaterService.isAuth;
  posters: PosterMainResponse[] = [];

  ngOnInit() {
    this.subscriptionUpdater = this.authUpdaterService
      .observe()
      .subscribe((isAuth) => {
        this.isAuth = isAuth
      });

    this.posterMainService
      .getPosters()
      .then(
        (response) => {
          this.posters = response.reverse();
        },
        (error) => {
          console.log(error);
        }
      )
      .catch((err) => {
        console.log(err);
      });
  }

  ngOnDestroy() {
    this.subscriptionUpdater.unsubscribe();
  }
}
