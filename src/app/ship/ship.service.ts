import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { Ship } from './ship';

@Injectable({
  providedIn: 'root'
})
export class ShipService {

  endpoint: string = process.env['NODE_ENV'] === 'production' ? '//carpediem-paint.herokuapp.com/api/ship' : '//localhost:8081/api/ship';
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient) { }

  createShip(data: Ship): Observable<Ship> {
    const API_URL = `${this.endpoint}`;

    return this.http.post(API_URL, data)
      .pipe(
        map((res: Object) => <Ship>res),
        catchError(this.errorMngmt)
      );
  }

  getShips(): Observable<Ship[]> {
    return this.http.get(this.endpoint)
      .pipe(
        map((res: Object) => <Ship[]>res),
        catchError(this.errorMngmt)
      );
  }

  getShip(id: string): Observable<Ship> {
    const API_URL = `${this.endpoint}/${id}`;

    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: any) => {
          return <Ship>res[0]
        }),
        catchError(this.errorMngmt)
      )
  }

  editShip(id?: string, data?: Ship): Observable<Ship> {
    const API_URL = `${this.endpoint}/${id}`;

    console.log(id, data);

    return this.http.put(API_URL, data)
      .pipe(
        map((res: any) => <Ship>res),
        catchError(this.errorMngmt)
      )
  }

  deleteShip(id: string) {
    const API_URL = `${this.endpoint}/${id}`

    return this.http.delete(API_URL, { headers: this.headers })
      .pipe(
        catchError(this.errorMngmt)
      );
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
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
