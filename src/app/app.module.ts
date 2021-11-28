import { NgModule } from '@angular/core';
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
    EditPaintComponent
  ],
  imports: [
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
    MatSortModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
