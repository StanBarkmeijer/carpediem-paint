import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Paint } from '../paint';
import { PaintService } from '../paint.service';

@Component({
  selector: 'app-paints',
  templateUrl: './paints.component.html',
  styleUrls: ['./paints.component.css']
})
export class PaintsComponent implements OnInit {

  paints: Paint[] = [];
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
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(() => this.getPaints());
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
