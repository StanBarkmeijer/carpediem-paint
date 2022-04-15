import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  hide: boolean = true;

  registerSubscription!: Subscription;

  registerForm = this.fb.group({
    firstName: ["", [Validators.required, Validators.minLength(3)]],
    lastName: ["", [Validators.required, Validators.minLength(3)]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    retypePassword: ["", [Validators.required, Validators.minLength(6)]],
    birthday: ["", Validators.required]
  });

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.registerSubscription.unsubscribe();
  }

  register() {
    this.registerSubscription = this.userService
      .register(this.registerForm.value)
      .subscribe(() => this.router.navigateByUrl("/"))
  }

}
