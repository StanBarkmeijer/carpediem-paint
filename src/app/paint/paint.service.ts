import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Paint } from './paint';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaintService {

  endpoint: string = "http://localhost:8081/api/paint";
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient) { }

  createPaint(data: Paint): Observable<any> {
    const API_URL = `${this.endpoint}`;

    return this.http.post(API_URL, data)
      .pipe(catchError(this.errorMngmt));
  }

  getPaints(): Observable<any> {
    return this.http.get(this.endpoint);
  }

  getPaint(id: string): Observable<any> {
    const API_URL = `${this.endpoint}/${id}`;

    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Object) => {
          return res
        }),
        catchError(this.errorMngmt)
      )
  }

  deletePaint(id: string) {
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
