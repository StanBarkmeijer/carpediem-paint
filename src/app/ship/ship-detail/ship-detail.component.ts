import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { Ship } from '../ship';
import { ShipService } from '../ship.service';

@Component({
  selector: 'app-ship-detail',
  templateUrl: './ship-detail.component.html',
  styleUrls: ['./ship-detail.component.css']
})
export class ShipDetailComponent implements OnInit {

  @Input() ship!: Ship;
  paints: any[] = [];

  constructor(
    private shipService: ShipService,
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getShip();
  }

  getShip(): void {
    this.route.params.subscribe((param: any) => {
      const id = param["id"];

      this.shipService.getShip(id)
        .subscribe((ship: Ship) => {
          this.ship = ship;
          console.log(this.ship);

          let paints: any[] = [];

          ship.voorschip.forEach((row: any) => {
            paints.push({part: row.part, paint: row.paint[0].name, color: row.paint[0].color });
          });

          ship.middenschip.forEach((row: any) => {

            paints.push({part: row.part, paint: row.paint[0].name, color: row.paint[0].color });
          });

          ship.achterschip.forEach((row: any) => {
            paints.push({part: row.part, paint: row.paint[0].name, color: row.paint[0].color });
          });

          ship.overigen.forEach((row: any) => {
            paints.push({part: row.part, paint: row.paint[0].name, color: row.paint[0].color });
          });

          this.paints = paints;
        });
    });
  }

  goBack(): void {
    this.location.back();
  }

}
