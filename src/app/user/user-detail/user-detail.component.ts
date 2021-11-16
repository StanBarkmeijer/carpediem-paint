import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input() user?: User;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.route.params.subscribe((param) => {
      const id = Number(param["id"]);

      this.userService.getUser(id)
        .subscribe((user) => this.user = user);
    }) 
  }

  goBack(): void {
    this.location.back();
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id);

    this.toastr.success(`User with id: ${id} deleted`, "User deleted",  {
      progressBar: true
    });

    this.location.back();
  }

}
