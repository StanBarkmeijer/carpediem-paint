import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  endpoint: string = process.env['NODE_ENV'] === 'production' ? '//carpediem-paint.herokuapp.com/api/order' : '//localhost:8081/api/order';
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient) { }

  createOrder(data: any): Observable<any> {
    const API_URL = `${this.endpoint}`;

    return this.http.post(API_URL, data)
      .pipe(
        map((res: Object) => <any>res),
        catchError(this.errorMngmt)
      );
  }

  getOrders(): Observable<any[]> {
    return this.http.get(this.endpoint)
      .pipe(
        map((res: Object) => <any[]>res),
        catchError(this.errorMngmt)
      );
  }

  getOrder(id: string): Observable<any> {
    const API_URL = `${this.endpoint}/${id}`;

    return this.http.get(API_URL)
      .pipe(
        map((res: any) => {
          return <any>res[0]
        }),
        catchError(this.errorMngmt)
      )
  }

  editOrder(id: string, data: any): Observable<any> {
    const API_URL = `${this.endpoint}/${id}`;

    console.log(data);

    return this.http.put(API_URL, data)
      .pipe(
        map((res: any) => <any>res),
        catchError(this.errorMngmt)
      )
  }

  deleteOrder(id: string) {
    const API_URL = `${this.endpoint}/${id}`

    return this.http.delete(API_URL, { headers: this.headers })
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
