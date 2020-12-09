import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Inventario } from '../models/inventario';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  inventarioList: AngularFireList<any>;
  selectedInventario: Inventario = new Inventario();
  inventarioForm: FormGroup;
  imageList = [];

  constructor(
    private formBuilder: FormBuilder,
    private aFDB: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.inventarioForm = this.formBuilder.group ({
      $key: [null, []],
      fecha: ['', []],
      nombre: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      imagen: this.formBuilder.array([])
    });
  }

  addImagenField() {
    this.imagenField.push(this.createImagenField());
  }

  createImagenField() {
    return this.formBuilder.group({
      urlImage: ['', []]
    });
  }

  removeImagenField(i) {
    this.imagenField.removeAt(i);
  }

  removeAllImagenField() {
    this.imagenField.clear();
  }

  get imagenField() {
    return this.inventarioForm.get('imagen') as FormArray;
  }

  getInventario() {
    this.inventarioList = this.aFDB.list('inventario');
    return this.inventarioList.snapshotChanges();

  }

  insertInventario(inventario: Inventario)
    {
      this.inventarioList.push({
        nombre: inventario.nombre,
        imagen: inventario.imagen,
        marca: inventario.marca,
        cantidad: inventario.cantidad,
        fecha: inventario.fecha
      });
    }

    updateInventario(inventario: Inventario)
    {
      this.inventarioList.update(inventario.$key, {
        nombre: inventario.nombre,
        imagen: inventario.imagen,
        marca: inventario.marca,
        cantidad: inventario.cantidad,
        fecha: inventario.fecha
      });
    }

    deleteInventario($key: string) {
      this.inventarioList.remove($key);
    }

    populateForm(producto) {
      this.inventarioForm.patchValue(producto);
      this.imageList = producto.imagen;
      console.log(this.imagenField.controls);
      return this.formBuilder.group({
        urlImage: [producto.imagen, []]
      });
    }
}
