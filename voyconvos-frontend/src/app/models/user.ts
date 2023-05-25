export class User {
    id: string;
    ci: string;
    nombres: string;
    apellidos: string;
    fecha_nacimiento: Date;
    sexo: string;
    telefono: string;
    ciudad_destino: string;
    dias_seguro: string;
    fecha_activacion: Date;
    userName: string;
    password: string;
    
    constructor( id: string, ci: string, nombres: string, apellidos: string, fecha_nacimiento: Date, sexo: string, telefono: string, ciudad_destino: string,  dias_seguro: string, fecha_activacion: Date, userName: string, password: string,){
        this.id = id;
        this.ci = ci;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.fecha_nacimiento = fecha_nacimiento;
        this.sexo = sexo;
        this.telefono = telefono;
        this.ciudad_destino = ciudad_destino;
        this.dias_seguro = dias_seguro;
        this.fecha_activacion = fecha_activacion;
        this.userName = userName;
        this.password = password;
        
    }
}