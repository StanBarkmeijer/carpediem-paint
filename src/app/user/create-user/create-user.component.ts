import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  userForm = this.fb.group({
    firstName: ["", [Validators.required, Validators.minLength(3)]],
    lastName: ["", [Validators.required, Validators.minLength(3)]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    repeatPassword: ["", [Validators.required, Validators.minLength(6)]]
  })

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  sendForm(): void {
    if (this.userForm.invalid) return;

    this.userService
      .createUser(this.userForm.value)
      .subscribe((user) => {
        this.toastr.success(`Created user with ID: ${user._id}`, "Added user", {
          progressBar: true
        });
    
        this.router.navigate(["/user"]);
      });
  }

}
