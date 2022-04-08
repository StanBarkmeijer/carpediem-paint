import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { Paint } from '../paint';
import { PaintService } from '../paint.service';

@Component({
  selector: 'app-paints',
  templateUrl: './paints.component.html',
  styleUrls: ['./paints.component.css']
})
export class PaintsComponent implements OnInit {

  paints: Paint[] = [];
  authenticated: boolean = false;
  displayedColumns = ["name", "price", "actions"];
  dataSource!: MatTableDataSource<Paint>;

  applyFilter(event: Event) {
    let filterValue: string = (event.target as HTMLInputElement).value;

    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor(
    private paintService: PaintService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getPaints();
    this.getMe();
  }

  getMe(): void {
    this.authService.getUser()
      .subscribe((me: any) => this.authenticated = me.roles.includes("admin"));
  }

  getPaints(): void {
    this.paintService.getPaints()
      .subscribe((paints: Paint[]) => {
        this.paints = paints
        this.dataSource = new MatTableDataSource<Paint>(paints);
      });
  }

  deletePaint(id: string): void {
    this.paintService
      .deletePaint(id)
      .subscribe(() => {
        this.toastr.success(`User with id: ${id} deleted`, "User deleted",  {
          progressBar: true
        });
        this.getPaints()
      });
  }
}
