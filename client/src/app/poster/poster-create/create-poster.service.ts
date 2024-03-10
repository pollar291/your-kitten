import { Injectable } from '@angular/core';
import { CreatePosterResponse } from './create-poster-response.model';
import { CreatePosterRequest } from './create-poster-request.model';
import { CreatePosterImageResponse } from './create-poster-image-response.model';
import { BaseApiService } from '../../base-api.service';

@Injectable({
  providedIn: 'root',
})
export class CreatePosterService {
  constructor(private api: BaseApiService) {}

  async createPoster(
    model: CreatePosterRequest
  ): Promise<CreatePosterResponse> {
    const data = await fetch(this.api.createPoster, {
      method: 'POST',
      headers: this.api.defaultHeaders(),
      body: JSON.stringify(model),
    });
    return (await data.json()) ?? [];
  }

  async createPosterImage(
    posterId: String,
    images: any[]
  ): Promise<CreatePosterImageResponse> {
    const formData = new FormData();
    formData.append('poster_id', posterId.toString());

    images.forEach((image) => {
      formData.append('file[]', image);
    });

    const data = await fetch(this.api.createPosterImage, {
      method: 'POST',
      headers: this.api.defaultHeaders(false),
      body: formData,
    });

    return (await data.json()) ?? [];
  }
}
