import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../servicios/auth.service';
import { User } from 'src/app/models/user';
import { FormGroup } from '@angular/forms';
import { UsersService } from '../../../../servicios/users.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  list = [];
  tecnico;

  constructor(
    private angularFirestore: AngularFirestore,
    public authService: AuthService,
    public usersService: UsersService
  ) { }

  filterRegistro = '';

  ngOnInit() {
    this.authService.getUser()
    .subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as User
        };
      });
    });
  }

  isTecnico(user) {
    this.angularFirestore.collection('users').doc(user.id).update({
      tecnico: user.tecnico
    });
  }

}
