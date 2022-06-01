import { Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Paint } from 'src/app/paint/paint';
import { Ship } from 'src/app/ship/ship';
import { ShipService } from 'src/app/ship/ship.service';
import { User } from 'src/app/user/user';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit, OnDestroy {

  @Input() ship!: Ship;
  paints: any[] = [];
  me!: User;

  getMeSubscription!: Subscription;
  routeSubscription!: Subscription;
  getShipSubscription!: Subscription;
  createOrderSubscription!: Subscription;

  constructor(
    private shipService: ShipService,
    private authService: AuthService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getShip();
    this.getMe();
  }

  ngOnDestroy(): void {
    this.getMeSubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();
    this.getShipSubscription?.unsubscribe();
    this.createOrderSubscription?.unsubscribe();
  }

  getMe(): void {
    this.getMeSubscription = this.authService
      .getUser()
      .subscribe((user: any) => this.me = user);
  }

  getShip(): void {
    this.routeSubscription = this.route.params.subscribe((param: any) => {
      const id = param["id"];

      this.getShipSubscription = this.shipService
        .getShip(id)
        .subscribe((ship: Ship) => {
          this.ship = ship;
          let paints: any = {
            "Voorschip": [],
            "Middenschip": [],
            "Achterschip": [],
            "Overigen": []
          };

          ship.voorschip
            .forEach((part: any) => paints["Voorschip"].push({
              part: part.part, 
              paint: part.paint, 
              color: part.paint.color,
              count: 0,
              amount: part.paint.amount 
            }));

          ship.middenschip
            .forEach((part: any) => paints["Middenschip"].push({
              part: part.part,
              paint: part.paint,
              color: part.paint.color,
              count: 0,
              amount: part.paint.amount 
            }));

          ship.achterschip
            .forEach((part: any) => paints["Achterschip"].push({
              part: part.part,
              paint: part.paint,
              color: part.paint.color,
              count: 0,
              amount: part.paint.amount 
            }));

          ship.overigen
            .forEach((part: any) => {
              console.log(part.paint);paints["Overigen"].push({
              part: part.part,
              paint: part.paint,
              color: part.paint.color,
              count: 0,
              amount: part.paint.amount 
            })});

          this.paints = paints;
        });
    });
    
  }

  order(): void {
    const x = [];

    // @ts-ignore
    let v = this.calculate(this.paints["Voorschip"]);
    // @ts-ignore
    let m = this.calculate(this.paints["Middenschip"]);
    // @ts-ignore
    let a = this.calculate(this.paints["Achterschip"]);
    // @ts-ignore
    let o = this.calculate(this.paints["Overigen"]);

    // Join voorschip, middenschip, achterschip, overigen
    x.push(...v, ...m, ...a, ...o);

    // Calculate total
    let total = 0;
    x.forEach((paint: any) => total += paint.price);

    const object = {
      user: this.me._id,
      ship: this.ship,
      paints: x,
      date: new Date()
    };

    this.createOrderSubscription = this.orderService
      .createOrder(object)
      .subscribe(() => {
        this.toastr.success("Order succesvol aangemaakt!");
        this.router.navigate(["/"]);
      });
  }

  private calculate(input: any): any[] {
    let paints: any[] = [];

    input.forEach((paint: any) => {
      if (paint.count > 0) {
        paints.push({
          ...paint,
          price: paint.paint.price * paint.count,
          amount: paint.paint.amount * paint.count
        });
      }
    });

    return paints;
  }
  
  goBack(): void {
    this.location.back();
  }

}
