import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, NgIf } from '@angular/common';
import { AuthUpdaterService } from './auth/auth-updater.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { BaseApiService } from './base-api.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { IconService } from './icon.service';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [BaseApiService, IconService],
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    NgIf,
    MatButtonModule,
    MatGridListModule,
  ],
  template: `
    <main>
      <mat-toolbar color="primary" class="app-toolbar">
        <mat-toolbar-row>
          <mat-icon class="logo-icon" [svgIcon]="'logo'"></mat-icon>
          <span>Your Kitten</span>
          <span class="toolbar-space"></span>
          <button *ngIf="!isAuth" mat-raised-button (click)="onLoginClick()">
            Логин
          </button>
          <span *ngIf="isAuth">{{ userEmail }}</span>
          <button *ngIf="isAuth" mat-raised-button (click)="onLogoutClick()">
            Выйти
          </button>
        </mat-toolbar-row>
      </mat-toolbar>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  isAuth: boolean = false;
  userEmail: string | null = null;
  private subscriptionUpdater!: Subscription;

  constructor(
    private iconService: IconService,
    private router: Router,
    private authUpdaterService: AuthUpdaterService
  ) {}

  ngOnInit() {
    this.iconService.registerIcons();

    this.isAuth = this.authUpdaterService.isAuth;
    if (this.isAuth) {
      this.userEmail = localStorage.getItem('email');
    }

    this.subscriptionUpdater = this.authUpdaterService
      .observe()
      .subscribe((isAuth) => {
        this.isAuth = isAuth;
        this.userEmail = localStorage.getItem('email');
      });
  }

  ngOnDestroy() {
    this.subscriptionUpdater.unsubscribe();
  }

  onLoginClick() {
    this.router.navigateByUrl('/auth');
  }

  onLogoutClick() {
    this.isAuth = false;
    this.userEmail = null;
    this.authUpdaterService.removeAuthData();
    this.router.navigateByUrl('/');
  }
}
