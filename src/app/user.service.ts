import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { USERS } from './mock-users';
import { User } from './user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[];

  constructor() { 
    this.users = USERS;
  }

  getUsers(): Observable<User[]> {
    const users = of(this.users);

    return users;
  }

  getUser(id: number): Observable<User> {
    const user = this.users.find((u: User) => u.id === id)!;

    return of(user);
  }

  deleteUser(id: number): void {
    const users = this.users.filter((u: User) => u.id !== id)!;

    this.users = users;
  };

}
