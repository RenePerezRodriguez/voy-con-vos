import { Component, OnInit } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-terminos-condiciones',
  templateUrl: './terminos-condiciones.component.html',
  styleUrls: ['./terminos-condiciones.component.scss']
})
export class TerminosCondicionesComponent {
  showModal = false; // Controla la visibilidad del modal

  ngOnInit() {
    // Mostrar el modal al cargar la página
    // Puedes ajustar la lógica para mostrar el modal
    // basándote en tus necesidades específicas
    this.mostrarModal();
  }

  mostrarModal() {
    // Lógica para mostrar el modal
    // Puedes ajustar la lógica para mostrar el modal
    // basándote en tus necesidades específicas
    // Por ejemplo, puedes usar una variable de estado
    // para controlar la visibilidad del modal
    // Por ejemplo: this.showModal = true;
    setTimeout(() => {
      this.showModal = true; // Mostrar el modal al cargar la página después de un retraso de 1 segundo
    }, 1000);
  }

  aceptar() {
    // Lógica para marcar los términos y condiciones como aceptados
    // y cerrar el modal
    this.showModal = false;
  }

  modalRef!: BsModalRef; // Asignación de tipo "!" para indicar que se inicializará en el constructor

  constructor(private modalService: BsModalService) {}

  openModal(template: any) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalRef.hide();
  }
}