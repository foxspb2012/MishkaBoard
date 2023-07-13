import { Injectable } from '@angular/core';
import { UserInterface } from '../../models/users-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersStorage: UserInterface[] = [];

  constructor() {
  }

  checkUser(user: UserInterface): boolean {
    const login = user.email.toLowerCase();
    const inLocalStorage = window.localStorage.getItem(`userLogin: ${login}`);
    const inUsersStorage = this.usersStorage.find((el) => el.email.toLowerCase() === login);

    let userInStore: UserInterface = <UserInterface>{};

    if (inLocalStorage) {
      userInStore = JSON.parse(inLocalStorage);
      return userInStore.password === user.password;
    } else if (inUsersStorage) {
      return inUsersStorage.password === user.password;
    } else {
      return false;
    }
  }

  setUser(user: UserInterface, saveToStorage: boolean = false): void {
    if (saveToStorage) {
      window.localStorage.setItem(`userLogin: ${user.email.toLowerCase()}`, JSON.stringify(user));
    } else {
      this.usersStorage.push(user);
    }
  }

  isUserExists(login: string): boolean {
    const inLocalStorage = Boolean(window.localStorage.getItem(`userLogin: ${login}`));
    const inUsersStorage = Boolean(this.usersStorage.find((el) => el.email === login));

    return inLocalStorage || inUsersStorage;
  }
}
