import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide: boolean = true;

  registerForm = this.fb.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required],
    retypePassword: ["", Validators.required],
    birthday: ["", Validators.required]
  });

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  register() {
    this.userService
      .register(this.registerForm.value)
      .subscribe(() => this.router.navigateByUrl("/"))
  }

}
