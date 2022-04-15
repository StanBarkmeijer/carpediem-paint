import { Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  @Input() user?: User;
  me: any;

  authServiceSubscription!: Subscription;
  routeSubscription!: Subscription;
  getUserSubscription!: Subscription;
  deleteUserSubscription!: Subscription;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getMe();
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.authServiceSubscription?.unsubscribe();
    this.getUserSubscription?.unsubscribe();
    this.deleteUserSubscription?.unsubscribe();
  }

  getMe(): void {
    this.authServiceSubscription = this.authService.getUser()
      .subscribe((me: any) => this.me = me);
  }

  getUser(): void {
    this.routeSubscription = this.route.params.subscribe((param: any) => {
      const id = param["id"];

      this.getUserSubscription = this.userService.getUser(id)
        .subscribe((user: User) => this.user = user);
    }) 
  }

  goBack(): void {
    this.location.back();
  }

  deleteUser(id: string): void {
    if (id == this.me._id) {
      this.toastr.error(`Can't delete your own account`, "User delete failed",  {
        progressBar: true
      });
      
      return; 
    }

    this.deleteUserSubscription = this.userService
      .deleteUser(id)
      .subscribe(() => {
        this.toastr.success(`User with id: ${id} deleted`, "User deleted",  {
          progressBar: true
        });
      });
  }

}
