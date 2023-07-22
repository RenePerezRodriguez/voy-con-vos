import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User} from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup;
  titulo = 'Crear Asegurado';
  id: string | null;
  userName!: string | null;
  password!: string | null;
  telefono: string;
  filtrarNumeros(event: any) {
    event.target.value = event.target.value.replace(/\D/g, '');
  }
  fechaNacimientoValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const fechaIngresada = new Date(control.value);
    const fechaActual = new Date();
    // Restamos un día a la fecha actual
    fechaActual.setDate(fechaActual.getDate());
    if (fechaIngresada > fechaActual) {
      return { fechaInvalida: true };
    }
    return null;
  }
  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private _userService: UserService,
              private aRouter: ActivatedRoute,
              )
  {
    this.userForm = this.fb.group({
      ci: ['', Validators.required],
      nombres: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      apellidos: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      fecha_nacimiento: ['', Validators.compose([Validators.required,this.fechaNacimientoValidator])],
      sexo: ['', Validators.required],
      telefono: ['', Validators.required],
      ciudad_destino: ['', Validators.required],
      dias_seguro: ['', Validators.required],
      //rol: ['', Validators.required],
    })
    this.id  = this.aRouter.snapshot.paramMap.get('id');
    this.telefono = ''; // Inicialización de la propiedad 'telefono'
    
    
  }


  ngOnInit(): void {
    this.isEdit();
  }

  addUser()
  {
    //console.log(this.productoForm)

    //  console.log(this.productoForm.get('producto')?.value)

    const USER: User = {
      id: this.userForm.get('id')?.value,
      ci: this.userForm.get('ci')?.value,
      nombres: this.userForm.get('nombres')?.value,
      apellidos: this.userForm.get('apellidos')?.value,
      fecha_nacimiento: this.userForm.get('fecha_nacimiento')?.value,
      sexo: this.userForm.get('sexo')?.value,
      telefono: this.userForm.get('telefono')?.value,
      ciudad_destino: this.userForm.get('ciudad_destino')?.value,
      dias_seguro: this.userForm.get('dias_seguro')?.value,
      fecha_activacion: this.userForm.get('fecha_activacion')?.value,
      userName: this.userForm.get('userName')?.value,
      password: this.userForm.get('password')?.value,

      //rol: this.userForm.get('rol')?.value,

    }
    if(this.id !== null){
      //Editamos usuario
      this._userService.updateUserID(this.id, USER).subscribe(data =>{
        this.toastr.info('El asegurado fue actualizado con exito!', 'Asegurado Actualizado!');
        this.router.navigate(['/list-users']);
      }, error =>{
        console.log(error);
        
        this.userForm.reset();
      })
    }else{
      //agregamos usuario
      this._userService.addUser(USER).subscribe(data => {
        this.toastr.success('El asegurado fue registrado con exito!', 'Asegurado Registrado!');
        this.router.navigate(['/list-users']);
      }, error =>{
        console.log(error);;
        this.toastr.warning('El usuario con el mismo CI no puede ser registrado');
      })
    }
  }
  isEdit() {
    this.aRouter.snapshot.paramMap.get('id');
    if(this.id !== null) {
      this.titulo ='Editar Asegurado';
      this._userService.getUserID(this.id).subscribe(data => {
        console.log(data)
        
        this.userForm.patchValue({
          ci: data.ci,
          nombres: data.nombres,
          apellidos: data.apellidos,
          fecha_nacimiento: data.fecha_nacimiento,
          sexo: data.sexo,
          telefono: data.telefono,
          ciudad_destino: data.ciudad_destino,
          dias_seguro: data.dias_seguro,
          //rol: data.rol,
        } )
      }, error =>{
        console.log(error)
      })
    }
  }
}
