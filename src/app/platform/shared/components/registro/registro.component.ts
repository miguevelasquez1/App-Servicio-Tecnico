import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../../../../servicios/registro.service';
import { Registro } from 'src/app/models/registro';
import { Router } from '@angular/router';

import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {


  Registro = [];

  constructor(
    public registroService: RegistroService,
    private router: Router
    ) { }

    submitted: boolean;
    formControls = this.registroService.form.controls;

  ngOnInit() {
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
    }
  }

  resetForm(form?: FormGroup)
  {
    if (form != null) {
      form.reset();
      this.registroService.selectedRegistro = new Registro();
    }
  }
}
