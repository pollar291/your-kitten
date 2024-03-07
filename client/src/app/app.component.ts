import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatIconModule, NgIf],
  template: `
    <main>
      <mat-toolbar color="primary" class="app-toolbar">
        <mat-toolbar-row>
          <span>Your Kitten</span>
          <span class="example-spacer"></span>
          <a *ngIf="!isAuth"  routerLinkActive="active">
            <button
              mat-mini-fab
              color="accent"
            >
              <mat-icon>account_circle</mat-icon>
            </button>
          </a>
          <span *ngIf="isAuth">{{ userEmail }}</span>
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

  ngOnInit() {
    this.isAuth = localStorage.getItem('token') != null;
    if (this.isAuth) {
      this.userEmail = localStorage.getItem('email');
    }
  }
}
