import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly usersKey = 'customers';

  constructor() {}

  getUsers(): any[] {
    const usersJson = localStorage.getItem(this.usersKey);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  saveUsers(users: any[]): void {
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }
}
