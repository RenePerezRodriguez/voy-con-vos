import { Component } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'
  ]
})
export class FooterComponent {

  modalRef!: BsModalRef; // Asignación de tipo "!" para indicar que se inicializará en el constructor

  constructor(private modalService: BsModalService) {}

  openModal(template: any) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalRef.hide();
  }
}