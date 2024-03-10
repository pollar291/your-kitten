import { Injectable } from '@angular/core';
import { PosterDetailsResponse } from './poster-details-response.model';
import { BaseApiService } from '../../base-api.service';

@Injectable({
  providedIn: 'root',
})
export class PosterDetailsService {
  constructor(private api: BaseApiService) {}

  async getPosterById(posterId: string): Promise<PosterDetailsResponse> {
    const data = await fetch(this.api.getPoster(posterId), {
      method: 'GET',
      headers: this.api.defaultHeaders()
    });
    return await data.json() ?? [];
  }
}
