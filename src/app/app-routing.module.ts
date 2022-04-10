import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlyAdminUsersGuard } from './auth/admin-user-guard';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateOrderComponent } from './order/create-order/create-order.component';
import { EditOrderComponent } from './order/edit-order/edit-order.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';
import { OrdersComponent } from './order/orders/orders.component';
import { SelectShipComponent } from './order/select-ship/select-ship.component';
import { CreatePaintComponent } from './paint/create-paint/create-paint.component';
import { EditPaintComponent } from './paint/edit-paint/edit-paint.component';
import { PaintDetailComponent } from './paint/paint-detail/paint-detail.component';
import { PaintsComponent } from './paint/paints/paints.component';
import { CreateShipComponent } from './ship/create-ship/create-ship.component';
import { EditShipComponent } from './ship/edit-ship/edit-ship.component';
import { ShipDetailComponent } from './ship/ship-detail/ship-detail.component';
import { ShipsComponent } from './ship/ships/ships.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserComponent } from './user/users/user.component';

const routes: Routes = [
  { path: "", pathMatch: "full", component: DashboardComponent, canActivate: [AuthGuard] },

  { path: "auth/login", pathMatch: "full", component: LoginComponent }, 
  { path: "auth/register", pathMatch: "full", component: RegisterComponent }, 

  {
    path: "order",
    canActivate: [AuthGuard],
    children: [
      { path: "", pathMatch: "full", component: OrdersComponent, canActivate: [OnlyAdminUsersGuard] },
      { path: "create", pathMatch: "full", component: SelectShipComponent },
      { path: "create/:id", pathMatch: "full", component: CreateOrderComponent },
      { path: ":id", pathMatch: "full", component: OrderDetailComponent },
    ]
  },

  {
    path: "user",
    canActivate: [AuthGuard],
    children: [
      { path: "", pathMatch: "full", component: UserComponent },
      { path: "create", pathMatch: "full", component: CreateUserComponent, canActivate: [OnlyAdminUsersGuard] },
      { path: ":id", pathMatch: "full", component: UserDetailComponent },
      { path: ":id/edit", pathMatch: "full", component: EditUserComponent, canActivate: [OnlyAdminUsersGuard] },
    ]
  },

  {
    path: "paint",
    canActivate: [AuthGuard],
    children: [
      { path: "", pathMatch: "full", component: PaintsComponent },
      { path: "create", pathMatch: "full", component: CreatePaintComponent, canActivate: [OnlyAdminUsersGuard] },
      { path: ":id", pathMatch: "full", component: PaintDetailComponent },
      { path: ":id/edit", pathMatch: "full", component: EditPaintComponent, canActivate: [OnlyAdminUsersGuard] },
    ]  
  },

  {
    path: "ship",
    canActivate: [AuthGuard],
    children: [
      { path: "", pathMatch: "full", component: ShipsComponent },
      { path: "create", pathMatch: "full", component: CreateShipComponent, canActivate: [OnlyAdminUsersGuard] },
      { path: ":id", pathMatch: "full", component: ShipDetailComponent },
      { path: ":id/edit", pathMatch: "full", component: EditShipComponent, canActivate: [OnlyAdminUsersGuard] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
