import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import { PosterMainComponent } from './poster/poster-main.component';
import { PosterCreateComponent } from './poster/create-poster/create-poster.component';

export const routes: Routes = [
  {
    path: '',
    component: PosterMainComponent,
    title: 'Главная',
  },
  {
    path: 'auth',
    component: AuthComponent,
    title: 'Авторизация',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Регистрация',
  },
  {
    path: 'create-poster',
    component: PosterCreateComponent,
    title: 'Создать объявление',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
