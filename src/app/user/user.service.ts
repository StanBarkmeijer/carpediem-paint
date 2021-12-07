import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { USERS } from './mock-users';
import { User } from './user';

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

  getUser(id: string): Observable<User> {
    const user = this.users.find((u: User) => u._id === id)!;

    return of(user);
  }

  deleteUser(id: string): void {
    const users = this.users.filter((u: User) => u._id !== id)!;

    this.users = users;
  };

  createUser(user: User): void {
    this.users.push(user);
  }
}
