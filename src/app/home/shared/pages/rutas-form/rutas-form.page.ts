import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

import { RegistroService } from '../../../../services/registro.service';
import { AuthService } from '../../../../services/auth.service';
import { Registro } from 'src/app/models/registro';
import { User } from 'src/app/models/user';
import { ChartService } from '../../../../services/chart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-rutas-form',
  templateUrl: './rutas-form.page.html',
  styleUrls: ['./rutas-form.page.scss'],
})
export class RutasFormPage implements OnInit {

  @ViewChild('placesRef') placesRef: GooglePlaceDirective;

  Registro = [];
  userUid;
  userName;
  public techniciansList: Array<any>;
  private month: number;
  private year: number;

  constructor(
    private authService: AuthService,
    public registroService: RegistroService,
    private router: Router,
    private chartService: ChartService,
    private currencyPipe: CurrencyPipe
    ) { }

    submitted: boolean;
    formControls = this.registroService.form.controls;

  ngOnInit() {
    this.getCurrentUser();

    this.registroService.form.valueChanges.subscribe( form => {
      if (form.precio) {
        this.registroService.form.patchValue({
          precio: this.currencyPipe.transform(form.precio.replace(/\D/g, '').replace(/^0+/, ''), 'USD', 'symbol-narrow', '1.0-0')
        }, {emitEvent: false} );
      }
    } );

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
        console.log(new Date().getFullYear(), this.year);
        if (new Date().getFullYear() === this.year) {
          this.chartService.addPoint(this.month);
        }
      } else {
        this.registroService.updateRegistro(this.registroService.form.value);
        // if (new Date().getFullYear() === this.year) {
        //   if (this.month) {
        //     this.chartService.addPoint(this.month);
        //   }
        // }
      }
      this.submitted = false;
      this.registroService.form.reset();
      this.router.navigate(['/home/rutas']);
    } else {
      this.registroService.form.markAllAsTouched();
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

  public getDate(e) {
    this.month = new Date(e.target.value).getMonth();
    this.year = new Date(e.target.value).getFullYear();
  }
}
