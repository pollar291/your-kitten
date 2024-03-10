import { Injectable } from '@angular/core';
import { RegisterRequest } from './register-request.model';
import { RegisterResponse } from './register-response.model';
import { BaseApiService } from '../base-api.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private api: BaseApiService) {}

  async registration(registration: RegisterRequest): Promise<RegisterResponse> {
    const data = await fetch(this.api.registration, {
      method: 'POST',
      body: JSON.stringify(registration),
      headers : this.api.defaultHeaders()
    });
    return await data.json() ?? [];
  }
}
