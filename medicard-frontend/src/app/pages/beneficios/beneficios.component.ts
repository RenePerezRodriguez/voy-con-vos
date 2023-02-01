import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-beneficios',
  templateUrl: './beneficios.component.html',
  styleUrls: ['./beneficios.component.css']
})
export class BeneficiosComponent implements OnInit {

  displayResponsive: boolean = false
  countries: any = [];
  atencion : string[] = [];
  constructor() { }

  cambiarResolucionModal(){
    const resolucion = window.screen.width;
    if(resolucion < 500){
      return "{width: '80%', heigth: '160vw'}"
    }else{
      return "{width: '60%', heigth: '160vw'}"
    }
  }
  
  showResponsiveDialog(){
    this.displayResponsive = true;
  }
  ngOnInit(): void {
    this.countries = [
      {
          cname: 'Cochabamba',
          code: 'cbba',
      },
      {
          cname: 'La Paz', 
          code: 'lpz',
      },
      {
          cname: 'Santa Cruz',
          code: 'sc',
      },
      {
        cname: 'Oruro',
        code: 'or'
      },
      {
        cname: 'Tarija',
        code: 'trj'
      },
      {
        cname: 'Sucre',
        code: 'scr'
      },
      {
        cname: 'Potosi',
        code: 'ps'
      }
  ];
  this.atencion = [ 'Cardiología', 'Medicina Familiar', 'Dermatología', 'Medicina Interna', 'Endocrinología', 'Neumología', 'Gastroenterología', 'Pediatría', 'Geriatría', 'Reumatología', 'Hematología', 'Oftalmología', 'Ginecología', 'Odontología', 'Nefrología']
  }
}
