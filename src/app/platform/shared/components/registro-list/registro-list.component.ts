import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../../../../services/registro.service';
import { AuthService } from '../../../../services/auth.service';

import { Router } from '@angular/router';
import { RegistroComponent } from '../registro/registro.component';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-registro-list',
  templateUrl: './registro-list.component.html',
  styleUrls: ['./registro-list.component.scss'],
})
export class RegistroListComponent implements OnInit {
  registroList = [];

  constructor(
    private menu: MenuController,
    private authService: AuthService,
    public registroService: RegistroService,
  ) { }

  filterRegistro = '';
  isAdmin: boolean;
  userUid: string;


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

    this.getRole();
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
        this.authService.isUser(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole).admin;
        });
      }
    });
  }
}
