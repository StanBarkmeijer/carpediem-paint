import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit, OnDestroy {

  createUserSubscription!: Subscription;

  userForm = this.fb.group({
    firstName: ["", [Validators.required, Validators.minLength(3)]],
    lastName: ["", [Validators.required, Validators.minLength(3)]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    repeatPassword: ["", [Validators.required, Validators.minLength(6)]]
  })

  constructor(
    private fb: UntypedFormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.createUserSubscription?.unsubscribe();
  }

  sendForm(): void {
    if (this.userForm.invalid) return;

    this.createUserSubscription = this.userService
      .createUser(this.userForm.value)
      .subscribe((user) => {
        this.toastr.success(`Created user with ID: ${user._id}`, "Added user", {
          progressBar: true
        });
    
        this.router.navigate(["/user"]);
      });
  }

}
