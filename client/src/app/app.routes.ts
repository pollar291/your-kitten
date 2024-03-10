import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import { PosterMainComponent } from './poster/poster-main.component';
import { PosterCreateComponent } from './poster/poster-create/create-poster.component';
import { PosterDetailsComponent } from './poster/poster-details/poster-details.component';

export const routes: Routes = [
  {
    path: '',
    component: PosterMainComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'create-poster',
    component: PosterCreateComponent,
  },
  {
    path: 'poster-details/:id',
    component: PosterDetailsComponent
  },
  {
    path: '**',
    redirectTo: '',
  },
];
