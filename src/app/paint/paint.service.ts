import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PAINTS } from './mock-paints';
import { Paint } from './paint';

@Injectable({
  providedIn: 'root'
})
export class PaintService {

  paints: Paint[];

  constructor() {
    this.paints = PAINTS;  
  }

  getPaints(): Observable<Paint[]> {
    const paints = of(this.paints);

    return paints;
  }

  getPaint(id: number): Observable<Paint> {
    const paint = this.paints.find((p: Paint) => p.id === id)!;

    return of(paint);
  }

  deletePaint(id: number):void {
    const paints = this.paints.filter((p: Paint) => p.id !== id)!;

    this.paints = paints;
  }

  createPaint(paint: Paint): void {
    this.paints.push(paint);
  }
}
