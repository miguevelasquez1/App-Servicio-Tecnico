import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

import { RegistroService } from '../../../../services/registro.service';
import { AuthService } from '../../../../services/auth.service';
import { Registro } from 'src/app/models/registro';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-rutas-form',
  templateUrl: './rutas-form.page.html',
  styleUrls: ['./rutas-form.page.scss'],
})
export class RutasFormPage implements OnInit {

  @ViewChild("placesRef") placesRef : GooglePlaceDirective;

  Registro = [];
  userUid;
  userName;
  sapo;
  public techniciansList: Array<any>;

  constructor(
    private authService: AuthService,
    public registroService: RegistroService,
    private router: Router
    ) { }

    submitted: boolean;
    formControls = this.registroService.form.controls;

  ngOnInit() {
    this.getCurrentUser();

    this.registroService.getRegistros()
      .subscribe(list => {
        this.Registro = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });

    this.authService.getUser()
      .subscribe(users => {
        const tecnicos = users.filter(user => {
          const userData = user.payload.doc.data() as User;
          return userData.tecnico;
        });
        this.techniciansList = tecnicos.map(user => {
          return {
            id: user.payload.doc.id,
            ...user.payload.doc.data() as User
          };
        });
      });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registroService.form.valid) {
      if (this.registroService.form.get('$key').value == null) {
        this.registroService.insertRegistro(this.registroService.form.value);
      } else {
        this.registroService.updateRegistro(this.registroService.form.value);
      }
      this.submitted = false;
      this.registroService.form.reset();
      this.router.navigate(['/home/rutas']);
    }
  }

  getCurrentUser() {
    this.authService.isAuth2().subscribe(auth => {

      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUser(this.userUid).subscribe(user => {
          this.userUid = user.uid;
          this.userName = user.name;
        });
      }
    });
  }

  resetForm(form?: FormGroup)
  {
    if (form != null) {
      form.reset();
      this.registroService.selectedRegistro = new Registro();
    }
  }
}
