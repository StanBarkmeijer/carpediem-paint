import { Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Ship } from '../ship';
import { ShipService } from '../ship.service';

@Component({
  selector: 'app-ship-detail',
  templateUrl: './ship-detail.component.html',
  styleUrls: ['./ship-detail.component.css']
})
export class ShipDetailComponent implements OnInit, OnDestroy {

  @Input() ship!: Ship;
  paints: any[] = [];
  id = "-1";
  authenticated: boolean = false;

  authServiceSubscription!: Subscription;
  routeSubscription!: Subscription;
  getShipSubscription!: Subscription;

  constructor(
    private shipService: ShipService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getShip();
  }

  ngOnDestroy(): void {
    this.authServiceSubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();
    this.getShipSubscription?.unsubscribe();
  }
  
  getMe(): void {
    this.authServiceSubscription = this.authService.getUser()
      .subscribe((me: any) => this.authenticated = me.roles.includes("admin"));
  }

  getShip(): void {
    this.routeSubscription = this.route.params.subscribe((param: any) => {
      const id = param["id"];
      this.id = id;

      this.getShipSubscription = this.shipService.getShip(id)
        .subscribe((ship: Ship) => {
          this.ship = ship;

          let paints: any = {
            "Voorschip": [],
            "Middenschip": [],
            "Achterschip": [],
            "Overigen": []
          };

          ship.voorschip
            .forEach((part: any) => paints["Voorschip"].push({part: part.part, paint: part.paint }));

          ship.middenschip
            .forEach((part: any) => paints["Middenschip"].push({part: part.part, paint: part.paint }));

          ship.achterschip
            .forEach((part: any) => paints["Achterschip"].push({part: part.part, paint: part.paint }));

          ship.overigen
            .forEach((part: any) => paints["Overigen"].push({part: part.part, paint: part.paint }));

          this.paints = paints;
        });
    });
  }

  goBack(): void {
    this.location.back();
  }

  deleteShip(id: string): void {
    this.shipService.deleteShip(id);

    this.toastr.success(`Ship with id: ${id} deleted`, "Ship deleted",  {
      progressBar: true
    });

    this.router.navigate(["/ships"]);
  }

}
