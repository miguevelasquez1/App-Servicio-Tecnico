import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventarioService } from 'src/app/services/inventario.service';

import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, CameraPhoto, CameraSource } from '@capacitor/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Inventario } from 'src/app/models/inventario';
const { Camera, Filesystem, Storage } = Plugins;

const isAvailable = Capacitor.isPluginAvailable('Camera');

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

  private submitted: boolean;
  public buttonCount: number;
  public limitCount: number;
  public uploadPercent: Observable<number | undefined>;
  private imageList: Array<string>;
  private inventarioList: Array<object>;

  constructor(
    public inventarioService: InventarioService,
    private storage: AngularFireStorage,
    private router: Router,
  ) { }

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
    // if (prueba.imagen === undefined) {
    //   this.imageList = [];
    // } else {
    //   this.inventarioService.imageList = prueba.imagen;
    // }
    this.buttonCount = 0;
    this.limitCount = 10;
    this.uploadPercent = new Observable<number | undefined>();
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
            this.inventarioService.imageList.push({urlImage: url.toString()});
          });
        })
      ).subscribe();
    }
  }

  public onSubmit() {
    this.submitted = true;
    if (this.inventarioService.inventarioForm.valid) {
      if (this.inventarioService.inventarioForm.get('$key').value == null) {
        this.inventarioService.insertInventario(this.inventarioService.inventarioForm.value);
      } else {
        this.inventarioService.updateInventario(this.inventarioService.inventarioForm.value);
      }
      this.submitted = false;
      this.inventarioService.resetForm(this.inventarioService.inventarioForm);
      this.router.navigate(['/inventario']);
    }
  }

  public addField(): void {
    this.buttonCount++;
  }

  public removeField(): void {
    this.buttonCount--;
  }

  takePicture() {
    Camera .getPhoto({
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

}
