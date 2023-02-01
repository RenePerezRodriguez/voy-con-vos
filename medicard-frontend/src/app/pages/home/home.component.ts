import { Component, OnInit } from '@angular/core';

interface Usuarios {
  nombre: string,
  edad: number
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuarios: Usuarios[] = [
    {
      nombre: 'Yurguen',
      edad: 15
    },
    {
      nombre: 'Cedrick',
      edad:22
    },
    {
      nombre: 'Andrea',
      edad:20
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
