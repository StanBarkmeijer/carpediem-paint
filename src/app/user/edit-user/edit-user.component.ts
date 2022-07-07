import { Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-user-detail',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, OnDestroy {

  @Input() user!: User;

  authServiceSubscription!: Subscription;
  routeSubscription!: Subscription;
  getUserSubscription!: Subscription;
  editUserSubscription!: Subscription;
  deleteUserSubscription!: Subscription;

  userForm = this.fb.group({
    firstName: ["", [Validators.required, Validators.minLength(3)]],
    lastName: ["", [Validators.required, Validators.minLength(3)]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]]
  })

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService,
    private router: Router,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.authServiceSubscription?.unsubscribe();
    this.getUserSubscription?.unsubscribe();
    this.editUserSubscription?.unsubscribe();
    this.deleteUserSubscription?.unsubscribe();
  }

  getUser(): void {
    this.routeSubscription = this.route.params.subscribe((param: any) => {
      const id = param["id"];

      this.getUserSubscription = this.userService.getUser(id)
        .subscribe((user: User) => this.user = user);
    }) 
  }

  saveUser(id: string): void {
    if (this.userForm.invalid) return;

    this.editUserSubscription = this.userService.editUser(id, this.user)
      .subscribe((user: User) => this.user = user);

    this.toastr.success(`User with id: ${this.user?._id} updated`, "User updated",  {
      progressBar: true
    });

    this.router.navigate(["/user"]);
  }

  goBack(): void {
    this.location.back();
  }

  deleteUser(id: string): void {
    this.deleteUserSubscription = this.userService
      .deleteUser(id)
      .subscribe(() => {
        this.toastr.success(`User with id: ${id} deleted`, "User deleted",  {
          progressBar: true
        });
    
        this.router.navigate(["/user"]);
      });
  }

}
