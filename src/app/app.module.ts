import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/users/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatListModule } from '@angular/material/list';
import { MatCommonModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio'  
import { MatCardModule } from '@angular/material/card';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { MatInputModule } from '@angular/material/input';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavComponent } from './nav/nav.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CreatePaintComponent } from './paint/create-paint/create-paint.component';
import { PaintsComponent } from './paint/paints/paints.component';
import { PaintDetailComponent } from './paint/paint-detail/paint-detail.component';
import { EditPaintComponent } from './paint/edit-paint/edit-paint.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user/user.service';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { OnlyAdminUsersGuard } from './auth/admin-user-guard';
import { AuthGuard } from './auth/auth.guard';
import { TokenStorage } from './auth/token.storage';
import { ActivatedRouteSnapshot, Router, RouterModule } from '@angular/router';
import { ShipsComponent } from './ship/ships/ships.component';
import { ShipDetailComponent } from './ship/ship-detail/ship-detail.component';
import { EditShipComponent } from './ship/edit-ship/edit-ship.component';
import { CreateShipComponent } from './ship/create-ship/create-ship.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CreateOrderComponent } from './order/create-order/create-order.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';
import { OrdersComponent } from './order/orders/orders.component';
import { EditOrderComponent } from './order/edit-order/edit-order.component';
import { SelectShipComponent } from './order/select-ship/select-ship.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserDetailComponent,
    DashboardComponent,
    CreateUserComponent,
    EditUserComponent,
    NavComponent,
    CreatePaintComponent,
    PaintsComponent,
    PaintDetailComponent,
    EditPaintComponent,
    LoginComponent,
    RegisterComponent,
    ShipsComponent,
    ShipDetailComponent,
    EditShipComponent,
    CreateShipComponent,
    CreateOrderComponent,
    OrderDetailComponent,
    OrdersComponent,
    EditOrderComponent,
    SelectShipComponent,
  ],
  imports: [
    HttpClientModule,
    MatSidenavModule,
    CommonModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatNativeDateModule,
    MatButtonModule,
    MatMenuModule,
    MatCommonModule,
    MatCardModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    LayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    RouterModule.forRoot([]),
    MatCheckboxModule,
    NgxSpinnerModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatExpansionModule,
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    UserService,
    OnlyAdminUsersGuard,
    AuthGuard,
    TokenStorage,
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
