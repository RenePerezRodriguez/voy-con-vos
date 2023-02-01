import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  miFormulario: FormGroup = this.fb.group({
    correo: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  
  login(){
    const {correo, password} = this.miFormulario.value;
    this.authService.Login(correo, password).subscribe(
      res => {
        if(res.isOk){
          this.router.navigateByUrl('/main/home')
        }
      }
    )
  }
  ngOnInit(): void {
  }

}
