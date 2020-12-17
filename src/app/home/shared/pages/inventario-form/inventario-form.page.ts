import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { RegistroService } from '../../../../servicios/registro.service';
import { Router } from '@angular/router';
import { InventarioService } from '../../../../servicios/inventario.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Inventario } from 'src/app/models/inventario';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, CameraPhoto, CameraSource } from '@capacitor/core';
const { Camera, Filesystem, Storage } = Plugins;

const isAvailable = Capacitor.isPluginAvailable('Camera');

@Component({
  selector: 'app-inventario-form',
  templateUrl: './inventario-form.page.html',
  styleUrls: ['./inventario-form.page.scss'],
})
export class InventarioFormPage implements OnInit {
  inventarioList = [];
  imageField = new FormControl('');

  constructor(
    public inventarioService: InventarioService,
    private router: Router,
    private storage: AngularFireStorage
    ) { }

    submitted: boolean;
    formControls = this.inventarioService.inventarioForm.controls;

    uploadPercent = new Observable<number>();
    urlImage = new Observable<string>();
    imageList = [];
    buttonCount = 0;
    limitCount = 3;

  ngOnInit() {
    this.inventarioService.getInventario()
      .subscribe(list => {
        this.inventarioList = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });

    const prueba = this.inventarioService.inventarioForm.value;
    if (prueba.imagen === undefined) {
      this.imageList = [];
    } else {
      this.imageList = prueba.imagen;
    }


  }

  onClick() {
    this.buttonCount++;
  }

  takePicture() {
    Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64
    });
  }

  public async getPhoto() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
      quality: 100
    });

  }

  onUpload(e) {
    for (let i = 0; i < (e.target.files.length); i++) {
      const id = Math.random().toString(36).substring(2);
      const file = e.target.files[i];
      const filePath = `uploads/${id}`;
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(url => {
            this.imageList.push(url.toString());
            // this.inventarioService.imagenField.controls[i] = url.toString();
          });
        })
      ).subscribe();
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.inventarioService.inventarioForm.valid) {
      if (this.inventarioService.inventarioForm.get('$key').value == null) {
        this.inventarioService.insertInventario(this.inventarioService.inventarioForm.value);
      } else {
        this.inventarioService.updateInventario(this.inventarioService.inventarioForm.value);
      }
      this.submitted = false;
      this.inventarioService.inventarioForm.reset();
      this.router.navigate(['/inventario']);
    }
  }

  resetForm(form?: FormGroup)
  {
    if (form != null) {
      form.reset();
      this.inventarioService.selectedInventario = new Inventario();
    }
    this.imageList = [];
    this.inventarioService.removeAllImagenField();
  }
}
