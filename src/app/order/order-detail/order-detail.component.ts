import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Paint } from 'src/app/paint/paint';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';
import { Order } from '../order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  
  @Input() order!: Order;
  price = 0;
  displayedColumns = ["name", "quantity", "price"];

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder(): void {
    this.route.params.subscribe((param: any) => {
      const id = param["id"];

      this.orderService.getOrder(id).subscribe((order: any) => {
        this.order = order;

        this.userService
            .getUser(order.user)
            .subscribe((user: User) => {
              order.user = user;
            });

        order.paints.forEach((paint: any) => this.price += (paint.paint.price * paint.count));
      });
    });
  }

  goBack(): void {
    this.location.back();
  }

}
