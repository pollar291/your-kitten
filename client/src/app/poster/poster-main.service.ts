import { Injectable } from '@angular/core';
import { PosterMainResponse } from './poster-main-response.model';
import { BaseApiService } from '../base-api.service';

@Injectable({
  providedIn: 'root'
})
export class PosterMainService {

  constructor(private api: BaseApiService) { }

  async getPosters(): Promise<PosterMainResponse[]> {
    const data = await fetch(this.api.getPosters, {
      method: 'GET',
      headers: this.api.defaultHeaders()
    });
    return (await data.json()) ?? [];
  }
}
