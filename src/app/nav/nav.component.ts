import { Component, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnDestroy {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map((result: any) => result.matches),
      shareReplay()
    );

  loggedIn: boolean = false;
  isAdmin: boolean = false;

  authSubscription!: Subscription;
  getUserSubscription!: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver, 
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    this.getUserSubscription.unsubscribe();
  }

  isLoggedIn(): void {
    this.authSubscription = this.authService.getUser()
      .subscribe((u) => this.loggedIn = u !== null );
  }

  userIsAdmin(): void {
    this.getUserSubscription = this.authService
      .getUser()
      .subscribe((u) => this.isAdmin = u!.roles.includes("admin"));	
  }

  signOut(): void {
    this.authService
      .signOut();
  }

}
