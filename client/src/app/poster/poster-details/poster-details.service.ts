import { Injectable } from '@angular/core';
import { PosterDetailsResponse } from './poster-details-response.model';

@Injectable({
  providedIn: 'root'
})
export class PosterDetailsService {

  url = 'http://127.0.0.1:5000/get_poster?poster_id=';

  async getPosterById(posterId: string): Promise<PosterDetailsResponse> {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    const data = await fetch(this.url + posterId, {
      method: 'GET'
    });
    return await data.json() ?? [];
  }
}
