import { Component, OnInit, HostListener } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import * as $ from 'jquery';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  
  ngOnInit() {
  }
  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY > 0) {
      $("#navbar").removeClass("bg-transparent").addClass("bg-danger");
        } else {
          $("#navbar").removeClass("bg-danger").addClass("bg-transparent");    }
          
  }

  modalRef!: BsModalRef; // Asignación de tipo "!" para indicar que se inicializará en el constructor

  constructor(private modalService: BsModalService,
              private router: Router) {}

  openModal(template: any) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalRef.hide();
  }
  //salir y borrar token
  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
}