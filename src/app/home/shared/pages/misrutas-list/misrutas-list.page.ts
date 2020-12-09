import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../../../../servicios/registro.service';
import { AuthService } from '../../../../servicios/auth.service';
import { Registro } from 'src/app/models/registro';

@Component({
  selector: 'app-misrutas-list',
  templateUrl: './misrutas-list.page.html',
  styleUrls: ['./misrutas-list.page.scss'],
})
export class MisrutasListPage implements OnInit {

  isAdmin: boolean;
  registroList = [];
  userUid: string;

  constructor(
    private authService: AuthService,
    public registroService: RegistroService
  ) { }

  filterRegistro = '';

  ngOnInit() {
    this.getRole();

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
    if (confirm('¿Estas seguro de que quieres elimnarlo?')){
      this.registroService.deleteRegistro($key);
    }
  }

  getRole() {
    this.authService.isAuth2().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole).admin;
        });
      }
    });
  }

  newForm() {
    this.registroService.form.reset();
    this.registroService.selectedRegistro = new Registro();
  }

  getCurrentUser() {
    this.authService.isAuth2().subscribe(auth => {

      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(user => {
          this.userUid = user.uid;
        });
      }
    });
  }

}
