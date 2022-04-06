import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input() user?: User;
  me: any;

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

  getMe(): void {
    this.authService.getUser()
      .subscribe((me: any) => this.me = me);
  }

  getUser(): void {
    this.route.params.subscribe((param: any) => {
      const id = param["id"];

      this.userService.getUser(id)
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

    this.userService
      .deleteUser(id)
      .subscribe(() => {
        this.toastr.success(`User with id: ${id} deleted`, "User deleted",  {
          progressBar: true
        });
      });
  }

}
