import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
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
    private aFDB: AngularFireDatabase
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.inventarioForm = this.formBuilder.group ({
      $key: [null, []],
      fecha: ['', [Validators.required]],
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
    const imageField = this.formBuilder.group({
      urlImage: ['', []]
    });

    return imageField;
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

  insertInventario(inventario: Inventario) {
      this.inventarioList.push({
        nombre: inventario.nombre,
        imagen: inventario.imagen,
        marca: inventario.marca,
        cantidad: inventario.cantidad,
        fecha: inventario.fecha
      });
  }

  updateInventario(inventario: Inventario) {
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
    // this.imagenField.patchValue([producto.imagen]);
    this.imageList = producto.imagen;
    return this.formBuilder.group({
      urlImage: [producto.imagen, []]
    });
  }

  resetForm(form?: FormGroup) {
    if (form != null) {
      form.reset();
      this.selectedInventario = new Inventario();
    }
    this.imageList = [];
    this.removeAllImagenField();
  }

}
