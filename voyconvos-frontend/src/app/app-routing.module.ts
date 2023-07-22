import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { BeneficiosComponent } from './beneficios/beneficios.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { LoginComponent } from './components/login/login.component';

//Guards
import { AuthGuard } from './utils/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'beneficios', component: BeneficiosComponent }, //ruta de la pagina beneficios
  { path: 'list-users', component: ListUsersComponent, canActivate: [AuthGuard] }, //lista usuarios
  { path: 'create-user', component: CreateUserComponent},
  { path: 'edit-user/:id', component: CreateUserComponent},
  { path: '**', redirectTo: '', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
