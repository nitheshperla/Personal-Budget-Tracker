import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInUserId: string | null = null;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<any[]>('assets/customers.json').pipe(
      map((customersData: any[]) => {
        const matchedUser = customersData.find(
          (user: any) => user.name === email && user.password === password
        );
        if (matchedUser) {
          this.loggedInUserId = matchedUser.id;
          return true;
        }
        return false;
      })
    );
  }

  isLoggedIn(): boolean {
    return !!this.loggedInUserId;
  }

  getCurrentUserId(): string | null {
    return this.loggedInUserId;
  }

  logout(): void {
    this.loggedInUserId = null;
  }
}