import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../../../../services/registro.service';
import { AuthService } from '../../../../services/auth.service';
import { Registro } from 'src/app/models/registro';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-rutas-list',
  templateUrl: './rutas-list.page.html',
  styleUrls: ['./rutas-list.page.scss'],
})
export class RutasListPage implements OnInit {

  isAdmin: boolean;
  registroList = [];
  userList = [];
  userUid: string;
  userName;

  constructor(
    private authService: AuthService,
    public registroService: RegistroService
  ) { }

  filterRegistro = '';

  ngOnInit() {
    this.registroService.getRegistros()
      .subscribe(list => {
        this.registroList = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
  }

  onDelete($key: string) {
    if (confirm('¿Estas seguro de que quieres eliminarlo?')){
      this.registroService.deleteRegistro($key);
    }
  }

  newForm() {
    this.registroService.form.reset();
    this.registroService.selectedRegistro = new Registro();
  }

}
