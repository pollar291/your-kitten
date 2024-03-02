import { Injectable } from '@angular/core';
import { RegisterRequest } from './register-request.model';
import { RegisterResponse } from './register-response.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url = 'http://127.0.0.1:5000/registration';

  async login(registration: RegisterRequest): Promise<RegisterResponse> {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    const data = await fetch(this.url, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(registration)
    });
    return await data.json() ?? [];
  }
}
