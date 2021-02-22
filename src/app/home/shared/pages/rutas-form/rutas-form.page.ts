import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

import { RegistroService } from '../../../../services/registro.service';
import { AuthService } from '../../../../services/auth.service';
import { Registro } from 'src/app/models/registro';

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
  }

  public handleAddressChange(address: Address) {
    console.log(address);
    
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
      this.router.navigate(['/mis-rutas']);
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
