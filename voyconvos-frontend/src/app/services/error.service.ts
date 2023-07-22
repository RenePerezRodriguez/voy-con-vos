import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private toastr: ToastrService) { }

  msgError(e : HttpErrorResponse) {
    //console.log(e)
    if (e.error.message) {
      this.toastr.error(e.error.message, 'Error');
    }else{
      this.toastr.error('Ocurrio un error, comuniquese con el administrador', 'Error');
    }
  }
}
