import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { User } from './user';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint: string = "https://carpediem-paint.herokuapp.com/api/user";
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient) { }

  createUser(data: User): Observable<any> {
    const API_URL = `${this.endpoint}`;

    return this.http.post(API_URL, data)
      .pipe(catchError(this.errorMngmt));
  }

  getUsers(): Observable<any> {
    return this.http.get(this.endpoint);
  }

  getUser(id: string): Observable<any> {
    const API_URL = `${this.endpoint}/${id}`;

    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Object) => {
          return res
        }),
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
