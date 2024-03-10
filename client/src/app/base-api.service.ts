import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  private baseUrl: String = 'http://127.0.0.1:5000';

  defaultHeaders(withJson: boolean = true) {
    const requestHeaders: HeadersInit = new Headers();
    if (withJson) {
      requestHeaders.set('Content-Type', 'application/json');
    }
    let token = localStorage.getItem('token');
    if (token) {
      requestHeaders.set('token', token);
    }
    return requestHeaders;
  }

  private with(api: string) {
    return `${this.baseUrl}\\${api}`;
  }

  get auth() {
    return this.with('auth');
  }

  get registration() {
    return this.with('registration');
  }

  get getPosters() {
    return this.with('get_posters');
  }

  getPoster(id: string) {
    return this.with(`get_poster?poster_id=${id}`);
  }

  get createPoster() {
    return this.with('create_poster');
  }

  get createPosterImage() {
    return this.with('load_poster_image');
  }

  createImageUrl(imageId: string) {
    return this.with(
      `poster_image?image_id=${imageId}&last_modified=${Math.floor(
        Date.now() / 1000
      )}`
    );
  }
}
