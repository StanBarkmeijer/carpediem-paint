import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[] = [];
  me: any;
  displayedColumns = ['firstName', 'email', "actions"];
  dataSource!: MatTableDataSource<User>;
  
  // applyFilter
  applyFilter(event: Event) {
    let filterValue: string = (event.target as HTMLInputElement).value;

    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(() => this.getUsers());
    this.getMe();
  }


  getUsers(): void {
    this.userService.getUsers()
      .subscribe((users: User[]) => {
        this.users = users;
        this.dataSource = new MatTableDataSource<User>(users);
      });
  }

  getMe(): void {
    this.authService.getUser()
      .subscribe((me: any) => this.me = me);
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
        this.getUsers();
      });
  }

}
