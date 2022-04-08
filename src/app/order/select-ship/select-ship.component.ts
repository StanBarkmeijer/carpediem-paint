import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ship } from 'src/app/ship/ship';
import { ShipService } from 'src/app/ship/ship.service';

@Component({
  selector: 'app-select-ship',
  templateUrl: './select-ship.component.html',
  styleUrls: ['./select-ship.component.css']
})
export class SelectShipComponent implements OnInit {

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

}
