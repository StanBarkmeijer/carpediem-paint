import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class OnlyAdminUsersGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService
      .getUser()
      .pipe(
        map((user: any) => !!user?.roles.includes("admin") || user?._id === this.route.snapshot.paramMap.get('id'))
      );
  }
}