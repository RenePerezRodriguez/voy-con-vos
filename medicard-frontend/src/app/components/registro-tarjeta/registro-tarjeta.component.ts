import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-tarjeta',
  templateUrl: './registro-tarjeta.component.html',
  styleUrls: ['./registro-tarjeta.component.css']
})
export class RegistroTarjetaComponent implements OnInit {

  stateOptions: any[];
  
  constructor(private fb:FormBuilder) {
    this.stateOptions = [{label: 'F', value: 'femenino'}, {label: 'M', value: 'masculino'}];
   }

  miFormulario: FormGroup = this.fb.group({
    nombres: ["", [Validators.required]],
    apellidos: ["", [Validators.required]],
    fecha_nacimiento: ["", [Validators.required]],
    ci: ["", [Validators.required]],
    sexo: ["", [Validators.required]],
    ciudad: ["", [Validators.required]],
    codigo: ["", [Validators.required]]
  });

  registrar(){
    console.log(this.miFormulario.value)
  }
  ngOnInit(): void {
    
  }

}
