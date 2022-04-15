import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';
import { Order } from '../order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {
  
  orders: Order[] = [];
  displayedColumns = ["user", "ship", "date", "price", "actions"];
  dataSource!: MatTableDataSource<Order>;

  getOrdersSubscription!: Subscription;
  getUserSubscription!: Subscription;
  setTrueSubscription!: Subscription;
  setFalseSubscription!: Subscription;

  applyFilter(event: Event) {
    let filterValue: string = (event.target as HTMLInputElement).value;

    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  ngOnDestroy(): void {
    this.getOrdersSubscription?.unsubscribe();
    this.getUserSubscription?.unsubscribe();
    this.setTrueSubscription?.unsubscribe();
    this.setFalseSubscription?.unsubscribe();
  }

  getOrders(): void {
    this.getOrdersSubscription = this.orderService.getOrders()
      .subscribe((orders: Order[]) => {
        orders.forEach((order: Order) => {
          let price = 0;

          order.paints.forEach((paint: any) => price += (paint.paint.price * paint.count));
          order.price = price;

          this.getUserSubscription = this.userService
            .getUser(order.user)
            .subscribe((user: User) => {
              order.user = user;
            });
        });

        this.orders = orders;
        this.dataSource = new MatTableDataSource<Order>(orders);
      });
  }

  setTrue(order: Order): void {
    order.approved = true;

    this.setTrueSubscription = this.orderService
      .editOrder(order._id, order)
      .subscribe(()=>{});
  }

  setFalse(order: Order): void {
    order.approved = false;

    this.setFalseSubscription = this.orderService
      .editOrder(order._id, order)
      .subscribe(()=>{});
  }

}
