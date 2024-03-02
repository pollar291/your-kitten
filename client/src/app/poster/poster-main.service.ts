import { Injectable } from '@angular/core';
import { PosterMainResponse } from './poster-main-response.model';

@Injectable({
  providedIn: 'root'
})
export class PosterMainService {

  constructor() { }

  url = 'http://127.0.0.1:5000/get_posters?limit=1000'

  async getPosters(): Promise<PosterMainResponse[]> {
    const data = await fetch(this.url, {
      method: 'GET'
    });
    return (await data.json()) ?? [];
  }
}
