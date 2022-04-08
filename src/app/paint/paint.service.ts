import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Paint } from './paint';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaintService {

  endpoint: string = process.env['NODE_ENV'] === 'production' ? '//carpediem-paint.herokuapp.com/api/paint' : '//localhost:8081/api/paint';
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient) { }

  createPaint(data: Paint): Observable<Paint> {
    const API_URL = `${this.endpoint}`;

    return this.http.post(API_URL, data)
      .pipe(
        map((res: Object) => <Paint>res),
        catchError(this.errorMngmt)
      );
  }

  getPaints(): Observable<Paint[]> {
    return this.http.get(this.endpoint)
      .pipe(
        map((res: Object) => <Paint[]>res),
        catchError(this.errorMngmt)
      );
  }

  getPaint(id: string): Observable<Paint> {
    const API_URL = `${this.endpoint}/${id}`;

    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: any) => {
          return <Paint>res[0]
        }),
        catchError(this.errorMngmt)
      )
  }

  editPaint(id: string, data: Paint): Observable<Paint> {
    const API_URL = `${this.endpoint}/${id}`;

    console.log(id, data);

    return this.http.put(API_URL, data)
      .pipe(
        map((res: any) => <Paint>res),
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
