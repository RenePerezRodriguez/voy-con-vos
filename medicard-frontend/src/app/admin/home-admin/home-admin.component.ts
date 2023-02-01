import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  miFormulario: FormGroup = this.fb.group({
    nombre: [{value: 'Gabriel Gomez Hernandez', disabled: true}, Validators.required],
    correo: [{value: 'ggomez@gmail.com', disabled: true}, [Validators.required, Validators.email]],
    celular: [{value: '67538650', disabled: true}, Validators.required],
    descripcion: [{value: 'Doctor con mas de 50 anos de experiencia', disabled: true}, [Validators.required]],
    especialidades: [{value: 'Cardiologo, Citujano', disabled: true}, [Validators.required]]
  })
  ngOnInit(): void {
  }

}
