import { Injectable } from '@angular/core';
import { UserServiceInterface, UserInterface } from '../../models/users-interface'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: UserServiceInterface | null;
  private token: string | null;

  constructor() {
  }

  fillData(token: string, user: UserServiceInterface): void {
    this.token = token;
    this.user = user;
  }

  setToStore(token: string, userId: string): void {
    window.localStorage.setItem('userToken', token);
    window.localStorage.setItem('userId', userId);
  }

  getUser(): UserServiceInterface | null {
    return this.user;
  };

  getUserId(): string {
    if (this.user) {
      return this.user.id || '';
    } else {
      let userId: any = window.localStorage.getItem('userId');
      return userId;
    }
  };
  getToken(): string {
    if (this.token) {
      return this.token;
    } else {
      let token: any = window.localStorage.getItem('userToken');
      return token;
    }
  };

  clearData(): void {
    this.user = null;
    this.token = null;
  }
  clearStore(): void {
    window.localStorage.removeItem('userToken');
    window.localStorage.removeItem('userId');
  }
}
