import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { BeneficiosComponent } from './beneficios/beneficios.component';
import { FooterComponent } from './footer/footer.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TerminosCondicionesComponent } from './terminos-condiciones/terminos-condiciones.component';

import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
//import para la integracion Frontend- Backend
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

//components
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { LoginComponent } from './components/login/login.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    BeneficiosComponent,
    FooterComponent,
    TerminosCondicionesComponent,
    ListUsersComponent,
    CreateUserComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    ],
  providers: [BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
