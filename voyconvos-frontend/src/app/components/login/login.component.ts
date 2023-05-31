import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/interfaces/user';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usuarioForm: FormGroup;
  userName: string = '';
  password: string = '';
  listUsers: User[] = [];

  constructor(private toastr: ToastrService,
              private _userService: UserService,
              private router: Router) 
  { 
    this.usuarioForm = new FormGroup({
      'userName': new FormControl(this.userName, Validators.required),
      'password': new FormControl(this.password, Validators.required)
    })
  }
  ngOnInit(): void {
  }

  login(){
    //validar que usuario ingrese datos
    if (this.userName== '' || this.password == '') 
    {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return
    }
    //Creamos el body
    const usuario: Usuario = {
      userName: this.userName,
      password: this.password
    }
    this._userService.login(usuario).subscribe({
      next: (token) => {
        console.log(token);
        this.router.navigate(['/lista-asegurados']);
        localStorage.setItem('token', token)
      },
      error: (e: HttpErrorResponse) => {
        this.msgError(e);
      }
    })
  }
  msgError(e : HttpErrorResponse) {
    if (e.error.msg) {
      this.toastr.error(e.error.msg, 'Error');
    }else{
      this.toastr.error('Ocurrio un error, comuniquese con el adminsitrador', 'Error');
    }
  }
  /*getUsers() {
    this._userService.getUsers().subscribe(data => {
      console.log(data);
      this.listUsers = data;
    }, error => {
      console.log(error);
    })
  }*/

}
