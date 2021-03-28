import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Registro } from 'src/app/models/registro';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  registroList: AngularFireList<any>;
  selectedRegistro: Registro = new Registro();
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private aFDb: AngularFireDatabase
  ) {
    this.buildForm();
   }

  private buildForm() {
    this.form = this.formBuilder.group ({
      $key: [null, []],
      userUid: [''],
      userName: [''],
      fecha: ['', []],
      nombreTecnico: ['', [Validators.required]],
      nombreCliente: ['', [Validators.required]],
      cedulaCliente: ['', [Validators.required]],
      servicio: ['', [Validators.required]],
      producto: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      precio: ['', [Validators.required]]
  });
  }

  getRegistros() {
    this.registroList = this.aFDb.list('registros');
    return this.registroList.snapshotChanges();
  }

  insertRegistro(registro: Registro) {
    this.registroList.push ({
      userUid: registro.userUid,
      userName: registro.userName,
      fecha: registro.fecha,
      nombreTecnico: registro.nombreTecnico,
      nombreCliente: registro.nombreCliente,
      cedulaCliente: registro.cedulaCliente,
      servicio: registro.servicio,
      producto: registro.producto,
      direccion: registro.direccion,
      precio: registro.precio,
    });
  }

  updateRegistro(registro: Registro) {
    this.registroList.update(registro.$key, {
      fecha: registro.fecha,
      nombreTecnico: registro.nombreTecnico,
      nombreCliente: registro.nombreCliente,
      cedulaCliente: registro.cedulaCliente,
      servicio: registro.servicio,
      producto: registro.producto,
      direccion: registro.direccion,
      precio: registro.precio,
    });
  }

  deleteRegistro($key: string)
  {
    this.registroList.remove($key);
  }

  populateForm(registro) {
    this.form.setValue(registro);
  }

}
