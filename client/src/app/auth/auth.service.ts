import { Injectable } from '@angular/core';
import { AuthRequest } from './auth-request.model';
import { AuthResponse } from './auth-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://127.0.0.1:5000/auth';

  async login(auth: AuthRequest): Promise<AuthResponse> {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    const data = await fetch(this.url, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(auth)
    });
    return await data.json() ?? [];
  }
}
