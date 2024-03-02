import { Injectable } from '@angular/core';
import { CreatePosterResponse } from './create-poster-response.model';
import { CreatePosterRequest } from './create-poster-request.model';
import { CreatePosterImageResponse } from './create-poster-image-response.model';

@Injectable({
  providedIn: 'root',
})
export class CreatePosterService {
  constructor() {}

  url = 'http://127.0.0.1:5000/create_poster';
  loadUrl = 'http://127.0.0.1:5000/load_poster_image';

  async createPoster(model: CreatePosterRequest): Promise<CreatePosterResponse> {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set('token', localStorage.getItem('token')!.toString());
    const data = await fetch(this.url, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(model),
    });
    return (await data.json()) ?? [];
  }

  async createPosterImage(posterId: String, images: any[]): Promise<CreatePosterImageResponse> {
    const formData = new FormData();
    formData.append('poster_id', posterId.toString());

    images.forEach((image) => {
      formData.append('file[]', image);
    });

    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('token', localStorage.getItem('token')!.toString());

    const data = await fetch(this.loadUrl, {
      method: 'POST',
      headers: requestHeaders,
      body: formData,
    })

    return (await data.json()) ?? [];
  }
}
