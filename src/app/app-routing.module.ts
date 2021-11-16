import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserComponent } from './user/users/user.component';

const routes: Routes = [
  { path: "", pathMatch: "full", component: DashboardComponent },
  { path: "users", component: UserComponent },
  { path: "edit-user/:id", component: EditUserComponent},
  { path: "create-user", component: CreateUserComponent },
  { path: "user/:id", component: UserDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
