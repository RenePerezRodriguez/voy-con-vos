import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit{
  searchTerm: string = '';
  listUsers: User[] = [];

  currentPage = 1; // Página actual
  itemsPerPage = 5; // Cantidad de elementos por página

  //@ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  //dataSource: any;
  //ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
  //}
  constructor(private _userService: UserService,
              private toastr: ToastrService,
              private router: Router){  }

  ngOnInit(): void {
    this.getUsers();
  }
  searchUser() {
    if (this.searchTerm.trim() === '') {
      // Si no hay término de búsqueda, mostrar la lista completa
       this.getUsers();
    } else {
      // Filtrar la lista de asegurados por término de búsqueda
      const searchTermLowerCase = this.searchTerm.toLowerCase();
      this.listUsers = this.listUsers.filter(user =>
        user.nombres.toLowerCase().includes(searchTermLowerCase) ||
        user.apellidos.toLowerCase().includes(searchTermLowerCase) ||
        user.ci.includes(this.searchTerm)
      );
    }
  }
  getUsers() {
    this._userService.getUsers().subscribe(data => {
      console.log(data);
      this.listUsers = data;
    }, error => {
      console.log(error);
    })
  }
  deleteUser(ci: any){
    this._userService.deleteUser(ci).subscribe(data =>{
      this.toastr.show('El asegurado fue eliminado con exito', 'Asegurado Eliminado');
      this.getUsers();
    }, error => {
      console.log(error);
    })
  }
  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }
}
