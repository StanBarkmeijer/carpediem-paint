import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';
import { Order } from '../order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  
  orders: Order[] = [];
  displayedColumns = ["user", "ship", "date", "price", "actions"];
  dataSource!: MatTableDataSource<Order>;

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

  getOrders(): void {
    this.orderService.getOrders()
      .subscribe((orders: Order[]) => {
        orders.forEach((order: Order) => {
          let price = 0;

          order.paints.forEach((paint: any) => price += (paint.paint.price * paint.count));
          order.price = price;

          this.userService
            .getUser(order.user)
            .subscribe((user: User) => {
              order.user = user;
            });
        });

        this.orders = orders;
        this.dataSource = new MatTableDataSource<Order>(orders);
      });
  }

  getUser(): void {

  }

}