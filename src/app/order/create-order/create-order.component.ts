import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ship } from 'src/app/ship/ship';
import { ShipService } from 'src/app/ship/ship.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  @Input() ship!: Ship;

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

      this.shipService
        .getShip(id)
        .subscribe((ship: Ship) => {
          this.ship = ship;
        });
    });
    
  }

}
