import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlyAdminUsersGuard } from './auth/admin-user-guard';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatePaintComponent } from './paint/create-paint/create-paint.component';
import { EditPaintComponent } from './paint/edit-paint/edit-paint.component';
import { PaintDetailComponent } from './paint/paint-detail/paint-detail.component';
import { PaintsComponent } from './paint/paints/paints.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserComponent } from './user/users/user.component';

const routes: Routes = [
  { path: "", pathMatch: "full", component: DashboardComponent, canActivate: [AuthGuard] },

  { path: "auth/login", pathMatch: "full", component: LoginComponent }, 
  { path: "auth/register", pathMatch: "full", component: RegisterComponent }, 

  { path: "users", component: UserComponent, canActivate: [AuthGuard] },
  { path: "edit-user/:id", component: EditUserComponent, canActivate: [OnlyAdminUsersGuard]},
  { path: "create-user", component: CreateUserComponent, canActivate: [OnlyAdminUsersGuard] },
  { path: "user/:id", component: UserDetailComponent, canActivate: [AuthGuard] },

  { path: "paints", component: PaintsComponent, canActivate: [AuthGuard] },
  { path: "edit-paint/:id", component: EditPaintComponent, canActivate: [OnlyAdminUsersGuard] },
  { path: "create-paint", component: CreatePaintComponent, canActivate: [OnlyAdminUsersGuard] },
  { path: "paint/:id", component: PaintDetailComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
