import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderService } from '../order/order.service';
import { Order } from '../order/order';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  chartRef!: ElementRef;  
  orderServiceSubscription!: Subscription;
  orders: Array<Order> = [];
  labels: string[] = ["Approved", "Unapproved"];
  approved: number = 0;
  unApproved: number = 0;
  
  doughnutChartData: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: [this.approved, this.unApproved], backgroundColor: ['#B3FFCC', '#FF6161'] }
  ];

  open(): void {
    this.router.navigate(["/assets/images/ShipDiagram.drawio.png"]);
  }

  approvedOrders(): Order[] {
    return this.orders.filter(order => order.approved);
  }

  notApprovedOrders(): Order[] {
    return this.orders.filter(order => !order.approved);
  }

  constructor(
    private router: Router,
    private orderService: OrderService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.orderServiceSubscription = this.orderService
      .getOrders()
      .subscribe({
        next: (orders: Order[]) => {
          orders.forEach((order: Order) => {
            order.user = this.userService
              .getUser(order.user)
              .subscribe({
                next: (user: any) => order.user = user,
                error: (err: any) => {}
              });

            this.orders.push(order);
          });

          this.approved = this.approvedOrders().length;
          this.unApproved = this.notApprovedOrders().length;

          this.doughnutChartData = [
            { data: [this.approved, this.unApproved], backgroundColor: ['#B3FFCC', '#FF6161'] }
          ];
        },
        error: (err: any) => {}
      });
  }

  ngOnDestroy() {
    this.orderServiceSubscription.unsubscribe();
  }
}
