import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() isAdmin: boolean = false;

  constructor() { }

  
  

  

  cambiarClase(){
    const resolucion = window.screen.width;
    if(resolucion < 992){
      return "navbar navbar-expand-lg navbar-light bg-light ps-5 pe-5 pt-4 pb-3"
    }else{
      return "navbar navbar-expand-lg bg-light ps-5 pe-5 pt-3 pb-3"

    }
  }

  
  ngOnInit(): void {
    
  }

}
