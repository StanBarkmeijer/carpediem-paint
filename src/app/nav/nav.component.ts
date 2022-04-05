import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map((result: any) => result.matches),
      shareReplay()
    );

  loggedIn: boolean = false;

  constructor(
    private breakpointObserver: BreakpointObserver, 
    public authService: AuthService,
    private router: Router
  ) {}

  isAdmin(): void {
    this.authService.getUser().subscribe((u) => this.loggedIn = u !== null );
  }

  signOut(): void {
    this.authService.signOut();
  }

}
