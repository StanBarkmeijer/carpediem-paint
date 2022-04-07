import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ship } from '../ship';
import { ShipService } from '../ship.service';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.css']
})
export class ShipsComponent implements OnInit {

  ships: Ship[] = [];
  displayedColumns = ["name", "actions"];
  dataSource!: MatTableDataSource<Ship>;

  applyFilter(event: Event) {
    let filterValue: string = (event.target as HTMLInputElement).value;

    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor(
    private shipService: ShipService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getShips();
  }

  getShips(): void {
    this.shipService.getShips()
      .subscribe((ships: Ship[]) => {
        this.ships = ships
        this.dataSource = new MatTableDataSource<Ship>(ships);
      });
  }

  deleteShip(id: string): void {
    this.shipService
      .deleteShip(id)
      .subscribe(() => {
        this.toastr.success(`User with id: ${id} deleted`, "User deleted",  {
          progressBar: true
        });
        this.getShips()
      });
  }

}
