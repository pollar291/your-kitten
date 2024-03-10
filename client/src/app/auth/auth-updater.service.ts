import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthUpdaterService {
  private state: BehaviorSubject<any>;

  constructor() {
    this.state = new BehaviorSubject<boolean>(this.isAuth);
  }

  observe(): Observable<boolean> {
    return this.state.asObservable();
  }

  setAuthData(token: string, email: string) {
    localStorage.setItem('email', email)
    localStorage.setItem('token', token)
    this.state.next(true);
  }

  removeAuthData() {
    localStorage.removeItem('email')
    localStorage.removeItem('token')
    this.state.next(false);
  }

  get isAuth() {
    return localStorage.getItem('token') != null
  }
}
