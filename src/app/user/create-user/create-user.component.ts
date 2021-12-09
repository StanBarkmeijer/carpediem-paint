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
    id: ((Math.random() * 100) + 1)|0,
    firstname: ["", Validators.required],
    lastname: ["", Validators.required],
    email: ["", Validators.required],
    password: ["", Validators.required],
    birthday: new Date()
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
    this.userService.createUser(this.userForm.value);

    this.toastr.success(`Created user with ID: ${this.userForm.value.id}`, "Added user", {
      progressBar: true
    });

    this.router.navigate(["user/users"]);
  }

}
