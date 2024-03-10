import { Injectable } from '@angular/core';
import { AuthRequest } from './auth-request.model';
import { AuthResponse } from './auth-response.model';
import { BaseApiService } from '../base-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: BaseApiService) {}

  async login(auth: AuthRequest): Promise<AuthResponse> {
    const data = await fetch(this.api.auth, {
      method: 'POST',
      headers: this.api.defaultHeaders(),
      body: JSON.stringify(auth)
    });
    return await data.json() ?? [];
  }
}
