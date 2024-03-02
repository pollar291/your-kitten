import { RegisterComponent } from './../register/register.component';
import { AuthComponent } from './../auth/auth.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { PosterMainService } from './poster-main.service';
import { PosterMainResponse } from './poster-main-response.model';

@Component({
  selector: 'poster-main',
  standalone: true,
  providers: [PosterMainService],
  imports: [
    RouterOutlet,
    AuthComponent,
    RegisterComponent,
    MatDividerModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    NgIf,
    NgFor,
  ],
  template: `
    <main>
      <mat-toolbar color="primary" class="app-toolbar">
        <mat-toolbar-row>
          <span>Your Kitten</span>
          <span class="example-spacer"></span>
          <a *ngIf="!isAuth" [routerLink]="['/auth']" routerLinkActive="active">
            <button
              mat-mini-fab
              color="accent"
              aria-label="Example icon button with a bookmark icon"
            >
              <mat-icon>account_circle</mat-icon>
            </button>
          </a>
          <span *ngIf="isAuth">{{ userEmail }}</span>
        </mat-toolbar-row>
      </mat-toolbar>
      <section class="content">
        <div>
          <ul>
            <li *ngFor="let poster of posters">
              <p>{{ poster.title }}</p>
              <p>{{ poster.description }}</p>
              <div *ngFor="let image of poster.images">
                <img class="thumbnail" src="{{ 'http://127.0.0.1:5000/poster_image?image_id=' + image + '&last_modified=1' }}" height="200" />
              </div>
            </li>
          </ul>
        </div>
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrl: './poster-main.component.css',
})
export class PosterMainComponent {
  constructor(private posterMainService: PosterMainService) {}

  isAuth: boolean = false;
  userEmail: string | null = null;
  posters: PosterMainResponse[] = [];

  ngOnInit() {
    this.isAuth = localStorage.getItem('token') != null;
    if (this.isAuth) {
      this.userEmail = localStorage.getItem('email');
    }

    this.posterMainService
      .getPosters()
      .then(
        (response) => {
          this.posters = response;
          console.log(response);
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
