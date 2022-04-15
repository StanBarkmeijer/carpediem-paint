import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string | null = null;
  password: string | null = null;
  error?: string;

  loginSubscription!: Subscription;

  loginForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required]
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }

  login(): void {    
    this.loginSubscription = this.authService
      .login(this.loginForm.get("email")?.value, this.loginForm.get("password")?.value)
      .subscribe({ 
        next: () => this.router.navigateByUrl("/"),
        error: () => this.error = "Incorrect email or password"
      }); 
  }

  handleEnter(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      this.login();
    }
  }

}
