import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, pluck, tap } from 'rxjs';
import { User } from '../user/user';
import { TokenStorage } from './token.storage';

interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user$ = new BehaviorSubject<User | null>(null);
  
  endpoint: string = "https://carpediem-paint.herokuapp.com/api/user";
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorage
  ) { }

  login(email: string, password: string): Observable<User> {
    const API_URL = `${this.endpoint}/auth/login`

    return this.http
      .post<AuthResponse>(API_URL, { email, password })
      .pipe(
        tap(({ token, user }) => {
          this.setUser(user);
          this.tokenStorage.saveToken(token);
        }),
        pluck("user")
      )
  }

  setUser(user: User | null): void {
    this.user$.next(user);
  }

  getUser(): Observable<User | null> {
    return this.user$.asObservable();
  }

  me(): Observable<User | null> {
    return this.http
      .get<AuthResponse>("http://carpediem-paint.herokuapp.com/api/auth/me")
      .pipe(
        tap(({ user }) => this.setUser(user)),
        pluck("user"),
        catchError(() => of(null))
      )
  }

  signOut(): void {
    this.tokenStorage.signOut();
    this.setUser(null);
  }

  getAuthorizationHeaders() {
    const token: string | null = this.tokenStorage.getToken() || "";
    return { Authorization: `Bearer ${token}` };
  }

}
