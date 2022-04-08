import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { User } from './user';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint: string = "//carpediem-paint.herokuapp.com/api/user";
  // endpoint: string = "//localhost:8081/api/user";
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient) { }

  register(data: {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    retypePassword: string,
    birthday: Date
  }): Observable<User> {
    const API_URL = `${this.endpoint}`;

    return this.http.post(API_URL, data)
      .pipe(
        map((res: Object) => <User>res),
        catchError(this.errorMngmt)
      );
  }

  createUser(data: User): Observable<User> {
    const API_URL = `${this.endpoint}`;

    return this.http.post(API_URL, data)
      .pipe(
        map((res: Object) => <User>res),
        catchError(this.errorMngmt)
      );
  }

  getUsers(): Observable<User[]> {
    return this.http.get(this.endpoint)
      .pipe(
        map((res: Object) => {
          return <User[]>res;
        }),
        catchError(this.errorMngmt)
      );
  }

  getUser(id: string): Observable<User> {
    const API_URL = `${this.endpoint}/${id}`;

    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: any) => {
          return <User>res[0]
        }),
        catchError(this.errorMngmt)
      )
  }

  editUser(id: string, data: User): Observable<User> {
    const API_URL = `${this.endpoint}/${id}`;

    console.log(id, data);

    return this.http.put(API_URL, data)
      .pipe(
        map((res: any) => <User>res),
        catchError(this.errorMngmt)
      )
  }
    

  deleteUser(id: string) {
    const API_URL = `${this.endpoint}/${id}`

    return this.http.delete(API_URL)
      .pipe(
        catchError(this.errorMngmt)
      )
  } 

  errorMngmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    return throwError(errorMessage);
  }
  
}
