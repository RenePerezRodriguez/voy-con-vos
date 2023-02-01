import { Component, OnInit } from '@angular/core';
 
interface Persona{
  nombre: string,
  edad: number
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  
  //Atributos
  persona: Persona = {
    nombre: "",
    edad: 0
  }




  constructor() { }

  ngOnInit(): void {
  }
  saludar(){
    this.persona.edad = 20;
    this.persona.nombre = "Yurguen Enrique"
    console.log("Edad: " + this.persona.edad +" "+ "Nombre: "+ this.persona.nombre)
  }
  cambiarPadding(){
    const resolucion: number = window.screen.width;
    if(resolucion < 769){
      return "background-color: #4d787a; padding-top: 70px; padding-left: 20px; padding-right: 20px; width: 100%; margin: auto; color: white; font-size: 15px;"
    }else{
      return "background-color: #4d787a; padding-top: 70px; padding-left: 100px; padding-right: 100px; width: 100%; margin: auto; color: white; font-size: 15px;"
    }
  }
  verificarCelular(){
    const resolucion = window.screen.width;
    if(resolucion < 576){
      return true;
    }else{
      return false;
    }
  }
}
